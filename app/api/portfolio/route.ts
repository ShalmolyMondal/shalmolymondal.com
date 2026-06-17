import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { ADMIN_PASSWORD, getPortfolioData, savePortfolioData } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

interface GitHubFileResponse {
    sha: string;
    content?: string;
}

function getDeployToken() {
    return process.env.DEPLOY_TOKEN ?? process.env.CMS_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;
}

function getRepoSlug() {
    return process.env.CMS_DEPLOY_REPO ?? process.env.GITHUB_REPOSITORY ?? 'ShalmolyMondal/shalmolymondal.com';
}

async function githubRequest<T>(path: string, init: RequestInit, token: string): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    let response: Response;

    try {
        response = await fetch(`https://api.github.com${path}`, {
            ...init,
            headers: {
                Accept: 'application/vnd.github+json',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-GitHub-Api-Version': '2022-11-28',
                ...init.headers,
            },
            cache: 'no-store',
            signal: controller.signal,
        });
    } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') {
            throw new Error('GitHub API request timed out');
        }
        throw error;
    } finally {
        clearTimeout(timeout);
    }

    const text = await response.text();
    const body = text ? JSON.parse(text) as { message?: string } : null;

    if (!response.ok) {
        throw new Error(body?.message ?? `GitHub API returned ${response.status}`);
    }

    return body as T;
}

async function deploySavedChanges(data: unknown) {
    const token = getDeployToken();

    if (!token) {
        return {
            deployed: false,
            skipped: true,
            message: 'Saved locally. Deploy skipped because DEPLOY_TOKEN, CMS_GITHUB_TOKEN, or GITHUB_TOKEN is not configured on the server.',
        };
    }

    try {
        const branch = process.env.CMS_DEPLOY_BRANCH || 'main';
        const repo = getRepoSlug();
        const filePath = 'data/portfolio.json';
        const encodedPath = filePath.split('/').map(encodeURIComponent).join('/');
        const file = await githubRequest<GitHubFileResponse>(
            `/repos/${repo}/contents/${encodedPath}?ref=${encodeURIComponent(branch)}`,
            { method: 'GET' },
            token,
        );
        const nextContent = `${JSON.stringify(data, null, 2)}\n`;
        const encodedContent = Buffer.from(nextContent, 'utf8').toString('base64');
        const currentContent = file.content ? Buffer.from(file.content, 'base64').toString('utf8') : '';

        if (currentContent === nextContent) {
            return {
                deployed: false,
                skipped: true,
                message: 'Saved. No GitHub changes to deploy.',
            };
        }

        const timestamp = new Date().toISOString();
        await githubRequest(
            `/repos/${repo}/contents/${encodedPath}`,
            {
                method: 'PUT',
                body: JSON.stringify({
                    message: `Update portfolio content ${timestamp}`,
                    content: encodedContent,
                    sha: file.sha,
                    branch,
                    committer: {
                        name: 'Portfolio CMS',
                        email: 'cms@local',
                    },
                    author: {
                        name: 'Portfolio CMS',
                        email: 'cms@local',
                    },
                }),
            },
            token,
        );

        return {
            deployed: true,
            skipped: false,
            message: `Saved and committed data/portfolio.json to ${repo}@${branch}.`,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown deploy error';
        return {
            deployed: false,
            skipped: false,
            message: `Save failed during GitHub deploy: ${message}`,
        };
    }
}

function isValidPassword(password: unknown) {
    return password === ADMIN_PASSWORD;
}

export async function GET() {
    try {
        const data = getPortfolioData();
        return NextResponse.json(data, {
            headers: {
                'Cache-Control': 'no-store, max-age=0',
            },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { password } = await request.json();

        if (!isValidPassword(password)) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        return NextResponse.json({ success: true });
    } catch {
        return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
    }
}

export async function PUT(request: Request) {
    try {
        const { password, data } = await request.json();

        if (!isValidPassword(password)) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        const token = getDeployToken();
        const deploy = token ? await deploySavedChanges(data) : null;

        if (deploy && !deploy.deployed && !deploy.skipped) {
            return NextResponse.json({ success: false, error: deploy.message, deploy }, { status: 500 });
        }

        if (!token) {
            savePortfolioData(data);
        }

        ['/', '/about', '/work', '/art', '/blog', '/contact', '/admin', '/admit'].forEach((path) => {
            revalidatePath(path);
        });
        revalidatePath('/', 'layout');
        return NextResponse.json({
            success: true,
            data,
            deploy: deploy ?? {
                deployed: false,
                skipped: true,
                message: 'Saved locally. Deploy skipped because no deploy token is configured.',
            },
        });
    } catch {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
