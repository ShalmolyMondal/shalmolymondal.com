import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { execFile } from 'child_process';
import { promisify } from 'util';
import { ADMIN_PASSWORD, getPortfolioData, savePortfolioData } from '@/lib/data';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

const execFileAsync = promisify(execFile);

async function git(args: string[]) {
    const { stdout } = await execFileAsync('git', args, {
        cwd: process.cwd(),
        maxBuffer: 1024 * 1024,
    });
    return stdout.trim();
}

async function deploySavedChanges() {
    const token = process.env.DEPLOY_TOKEN ?? process.env.CMS_GITHUB_TOKEN ?? process.env.GITHUB_TOKEN;

    if (!token) {
        return {
            deployed: false,
            skipped: true,
            message: 'Saved locally. Deploy skipped because DEPLOY_TOKEN, CMS_GITHUB_TOKEN, or GITHUB_TOKEN is not configured on the server.',
        };
    }

    try {
        const branch = process.env.CMS_DEPLOY_BRANCH || await git(['branch', '--show-current']) || 'main';
        const status = await git(['status', '--porcelain', '--', 'data/portfolio.json', 'public', 'docs']);

        if (!status) {
            return {
                deployed: false,
                skipped: true,
                message: 'Saved locally. No content or asset changes to deploy.',
            };
        }

        await git(['add', 'data/portfolio.json', 'public', 'docs']);

        const timestamp = new Date().toISOString();
        await execFileAsync('git', [
            '-c',
            'user.name=Portfolio CMS',
            '-c',
            'user.email=cms@local',
            'commit',
            '-m',
            `Update portfolio content ${timestamp}`,
        ], {
            cwd: process.cwd(),
            maxBuffer: 1024 * 1024,
        });

        const authHeader = Buffer.from(`x-access-token:${token}`).toString('base64');
        await execFileAsync('git', [
            '-c',
            `http.https://github.com/.extraheader=AUTHORIZATION: basic ${authHeader}`,
            'push',
            'origin',
            `HEAD:${branch}`,
        ], {
            cwd: process.cwd(),
            maxBuffer: 1024 * 1024,
        });

        return {
            deployed: true,
            skipped: false,
            message: `Saved, committed, and pushed to origin/${branch}.`,
        };
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown deploy error';
        return {
            deployed: false,
            skipped: false,
            message: `Saved locally, but deploy failed: ${message}`,
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

        savePortfolioData(data);
        ['/', '/about', '/work', '/art', '/blog', '/contact', '/admin', '/admit'].forEach((path) => {
            revalidatePath(path);
        });
        revalidatePath('/', 'layout');
        const deploy = await deploySavedChanges();
        return NextResponse.json({ success: true, data, deploy });
    } catch {
        return NextResponse.json({ error: 'Failed to update data' }, { status: 500 });
    }
}
