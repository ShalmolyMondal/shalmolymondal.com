'use client';

import type { FormEvent, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import type { PortfolioData } from '@/lib/data';

type PathSegment = string | number;
type FieldType = 'text' | 'textarea' | 'number' | 'checkbox' | 'list' | 'select';

interface FieldConfig {
    key: string;
    label: string;
    type?: FieldType;
    options?: string[];
}

const tabs = [
    'site',
    'personal',
    'about',
    'work',
    'research',
    'projects',
    'art',
    'blogs',
    'skills',
    'json',
] as const;

type Tab = (typeof tabs)[number];

interface SaveResponse {
    success: boolean;
    deploy?: {
        deployed: boolean;
        skipped: boolean;
        message: string;
    };
}

const blankProject = {
    id: '',
    title: '',
    category: '',
    description: '',
    technologies: [],
    status: '',
    progress: 0,
    image: '',
    liveUrl: '',
    githubUrl: '',
    pdfUrl: '',
    featured: false,
};

const blankArt = {
    id: '',
    title: '',
    description: '',
    image: '',
    category: '',
    date: '',
};

const blankBlog = {
    id: '',
    title: '',
    category: '',
    excerpt: '',
    date: '',
    readTime: '',
    url: '',
    featured: false,
    image: '',
};

const blankPublication = {
    id: '',
    title: '',
    venue: '',
    year: '',
    authors: '',
    url: '',
    type: '',
    doi: '',
    pdfUrl: '',
};

const blankExperience = {
    role: '',
    company: '',
    period: '',
    type: '',
    location: '',
    description: '',
};

const blankEducation = {
    degree: '',
    institution: '',
    period: '',
    field: '',
    logo: '',
};

function readPath(source: unknown, path: PathSegment[]) {
    return path.reduce<unknown>((current, segment) => {
        if (current == null) return undefined;
        return (current as Record<string, unknown>)[String(segment)];
    }, source);
}

function setPath<T>(source: T, path: PathSegment[], value: unknown): T {
    const next = structuredClone(source);
    let target: unknown = next;

    path.slice(0, -1).forEach((segment) => {
        target = (target as Record<string, unknown>)[String(segment)];
    });

    (target as Record<string, unknown>)[String(path[path.length - 1])] = value;
    return next;
}

function idFor(path: PathSegment[]) {
    return path.join('-');
}

function toTextList(value: unknown) {
    return Array.isArray(value) ? value.join('\n') : '';
}

function fromTextList(value: string) {
    return value.split('\n').map((item) => item.trim()).filter(Boolean);
}

function makeId(prefix: string) {
    return `${prefix}-${Date.now()}`;
}

export default function AdmitPage() {
    const [password, setPassword] = useState('');
    const [sessionPassword, setSessionPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [draft, setDraft] = useState<PortfolioData | null>(null);
    const [activeTab, setActiveTab] = useState<Tab>('site');
    const [status, setStatus] = useState('');
    const [error, setError] = useState('');
    const [jsonText, setJsonText] = useState('');
    const [jsonError, setJsonError] = useState('');
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        if (!draft) return;
        setJsonText(JSON.stringify(draft, null, 2));
    }, [draft]);

    const updateValue = (path: PathSegment[], value: unknown) => {
        setDraft((current) => current ? setPath(current, path, value) : current);
    };

    const addItem = (path: PathSegment[], item: Record<string, unknown>) => {
        const currentItems = readPath(draft, path);
        const items = Array.isArray(currentItems) ? currentItems : [];
        updateValue(path, [...items, item]);
    };

    const removeItem = (path: PathSegment[], index: number) => {
        const currentItems = readPath(draft, path);
        const items = Array.isArray(currentItems) ? currentItems : [];
        updateValue(path, items.filter((_, itemIndex) => itemIndex !== index));
    };

    const duplicateItem = (path: PathSegment[], index: number) => {
        const currentItems = readPath(draft, path);
        const items = Array.isArray(currentItems) ? currentItems : [];
        const source = items[index];
        if (!source || typeof source !== 'object') return;
        addItem(path, { ...(source as Record<string, unknown>), id: makeId('copy') });
    };

    const login = async (event: FormEvent) => {
        event.preventDefault();
        setStatus('');
        setError('');

        const response = await fetch('/api/portfolio', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password }),
        });

        if (!response.ok) {
            setError('Invalid password');
            return;
        }

        const dataResponse = await fetch('/api/portfolio', { cache: 'no-store' });
        const data = await dataResponse.json() as PortfolioData;
        setDraft(data);
        setSessionPassword(password);
        setPassword('');
        setIsAuthenticated(true);
    };

    const save = async () => {
        if (!draft) return;
        setIsSaving(true);
        setStatus('');
        setError('');

        try {
            const response = await fetch('/api/portfolio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: sessionPassword, data: draft }),
            });

            if (!response.ok) {
                setError('Save failed');
                return;
            }

            const result = await response.json() as SaveResponse;
            setStatus(result.deploy?.message ?? 'Saved. Public pages have been revalidated.');
        } catch {
            setError('Save failed');
        } finally {
            setIsSaving(false);
        }
    };

    const applyJson = () => {
        try {
            const parsed = JSON.parse(jsonText) as PortfolioData;
            setDraft(parsed);
            setJsonError('');
            setStatus('JSON applied. Save to publish it.');
        } catch (parseError) {
            setJsonError(parseError instanceof Error ? parseError.message : 'Invalid JSON');
        }
    };

    const field = (path: PathSegment[], label: string, type: FieldType = 'text', options: string[] = []) => {
        const value = readPath(draft, path);
        const fieldId = idFor(path);
        const baseClass = 'w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white outline-none transition focus:border-indigo-400';

        return (
            <label key={fieldId} htmlFor={fieldId} className="block">
                <span className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-slate-400">{label}</span>
                {type === 'textarea' && (
                    <textarea
                        id={fieldId}
                        value={typeof value === 'string' ? value : ''}
                        onChange={(event) => updateValue(path, event.target.value)}
                        rows={4}
                        className={baseClass}
                    />
                )}
                {type === 'number' && (
                    <input
                        id={fieldId}
                        type="number"
                        value={typeof value === 'number' ? value : 0}
                        onChange={(event) => updateValue(path, Number(event.target.value))}
                        className={baseClass}
                    />
                )}
                {type === 'checkbox' && (
                    <input
                        id={fieldId}
                        type="checkbox"
                        checked={Boolean(value)}
                        onChange={(event) => updateValue(path, event.target.checked)}
                        className="h-5 w-5 rounded border-slate-600 bg-slate-950 accent-indigo-500"
                    />
                )}
                {type === 'list' && (
                    <textarea
                        id={fieldId}
                        value={toTextList(value)}
                        onChange={(event) => updateValue(path, fromTextList(event.target.value))}
                        rows={4}
                        className={baseClass}
                    />
                )}
                {type === 'select' && (
                    <select
                        id={fieldId}
                        value={typeof value === 'string' ? value : ''}
                        onChange={(event) => updateValue(path, event.target.value)}
                        className={baseClass}
                    >
                        {options.map((option) => (
                            <option key={option} value={option}>{option}</option>
                        ))}
                    </select>
                )}
                {type === 'text' && (
                    <input
                        id={fieldId}
                        type="text"
                        value={typeof value === 'string' ? value : ''}
                        onChange={(event) => updateValue(path, event.target.value)}
                        className={baseClass}
                    />
                )}
            </label>
        );
    };

    const objectList = (title: string, path: PathSegment[], fields: FieldConfig[], blankItem: Record<string, unknown>) => {
        const items = readPath(draft, path);
        const list = Array.isArray(items) ? items : [];

        return (
            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <h2 className="text-lg font-semibold text-white">{title}</h2>
                    <button
                        type="button"
                        onClick={() => addItem(path, { ...blankItem, id: blankItem.id === '' ? makeId(title.toLowerCase()) : blankItem.id })}
                        className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
                    >
                        Add {title}
                    </button>
                </div>

                <div className="space-y-4">
                    {list.map((item, index) => (
                        <div key={`${title}-${index}`} className="rounded-lg border border-slate-800 bg-slate-950/70 p-4">
                            <div className="mb-4 flex items-center justify-between gap-3">
                                <h3 className="min-w-0 truncate text-sm font-semibold text-slate-200">
                                    {typeof item === 'object' && item && 'title' in item ? String((item as Record<string, unknown>).title || `${title} ${index + 1}`) : `${title} ${index + 1}`}
                                </h3>
                                <div className="flex shrink-0 gap-2">
                                    <button type="button" onClick={() => duplicateItem(path, index)} className="rounded-md border border-slate-700 px-3 py-1.5 text-xs text-slate-300 hover:border-indigo-400">Duplicate</button>
                                    <button type="button" onClick={() => removeItem(path, index)} className="rounded-md border border-red-500/40 px-3 py-1.5 text-xs text-red-200 hover:border-red-400">Delete</button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {fields.map((config) => (
                                    <div key={config.key} className={config.type === 'textarea' || config.type === 'list' ? 'md:col-span-2' : ''}>
                                        {field([...path, index, config.key], config.label, config.type, config.options)}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        );
    };

    const siteSections: Array<[string, ReactNode[]]> = [
        ['Metadata', [
            field(['site', 'metadata', 'title'], 'Browser title'),
            field(['site', 'metadata', 'description'], 'Meta description', 'textarea'),
            field(['site', 'loaderText'], 'Loader text'),
        ]],
        ['Navigation CTA', [
            field(['site', 'navigationCta', 'name'], 'CTA label'),
            field(['site', 'navigationCta', 'href'], 'CTA link'),
        ]],
        ['Hero', [
            field(['site', 'home', 'hero', 'badgeWords'], 'Badge words', 'list'),
            field(['site', 'home', 'hero', 'greetingPrefix'], 'Greeting prefix'),
            field(['site', 'home', 'hero', 'headlineSuffix'], 'Headline suffix'),
            field(['site', 'home', 'hero', 'subheading'], 'Subheading'),
            field(['site', 'home', 'hero', 'body'], 'Hero body', 'textarea'),
            field(['site', 'home', 'hero', 'primaryCtaLabel'], 'Primary CTA label'),
            field(['site', 'home', 'hero', 'primaryCtaHref'], 'Primary CTA link'),
            field(['site', 'home', 'hero', 'secondaryCtaLabel'], 'Secondary CTA label'),
            field(['site', 'home', 'hero', 'secondaryCtaHref'], 'Secondary CTA link'),
        ]],
        ['Home sections', [
            field(['site', 'home', 'currentFocus', 'title'], 'Focus title'),
            field(['site', 'home', 'currentFocus', 'description'], 'Focus description', 'textarea'),
            field(['site', 'home', 'artSection', 'title'], 'Art section title'),
            field(['site', 'home', 'artSection', 'description'], 'Art section description', 'textarea'),
            field(['site', 'home', 'artSection', 'ctaLabel'], 'Art CTA label'),
            field(['site', 'home', 'artSection', 'ctaHref'], 'Art CTA link'),
            field(['site', 'home', 'blogSection', 'title'], 'Blog section title'),
            field(['site', 'home', 'blogSection', 'description'], 'Blog section description', 'textarea'),
            field(['site', 'home', 'blogSection', 'ctaLabel'], 'Blog CTA label'),
            field(['site', 'home', 'blogSection', 'ctaHref'], 'Blog CTA link'),
        ]],
        ['Page headers', [
            field(['site', 'artPage', 'title'], 'Art page title'),
            field(['site', 'artPage', 'description'], 'Art page description'),
            field(['site', 'blogPage', 'eyebrow'], 'Blog eyebrow'),
            field(['site', 'blogPage', 'title'], 'Blog page title'),
            field(['site', 'blogPage', 'description'], 'Blog page description'),
            field(['site', 'contactPage', 'eyebrow'], 'Contact eyebrow'),
            field(['site', 'contactPage', 'title'], 'Contact title'),
            field(['site', 'contactPage', 'description'], 'Contact description'),
        ]],
        ['Reusable labels', [
            field(['site', 'labels', 'featured'], 'Featured label'),
            field(['site', 'labels', 'readArticle'], 'Read article label'),
            field(['site', 'labels', 'projectProgress'], 'Project progress label'),
            field(['site', 'labels', 'viewCode'], 'View code label'),
            field(['site', 'labels', 'viewPaper'], 'View paper label'),
            field(['site', 'labels', 'liveDemo'], 'Live demo label'),
        ]],
        ['Footer', [
            field(['site', 'footer', 'brand'], 'Footer brand'),
            field(['site', 'footer', 'description'], 'Footer description', 'textarea'),
            field(['site', 'footer', 'quickLinksTitle'], 'Quick links title'),
            field(['site', 'footer', 'connectTitle'], 'Connect title'),
            field(['site', 'footer', 'updatesTitle'], 'Updates title'),
            field(['site', 'footer', 'updatesDescription'], 'Updates description', 'textarea'),
            field(['site', 'footer', 'copyrightName'], 'Copyright name'),
        ]],
    ];

    if (!isAuthenticated) {
        return (
            <main className="min-h-screen bg-slate-950 px-6 py-12 text-white">
                <div className="mx-auto flex min-h-[80vh] max-w-md items-center">
                    <form onSubmit={login} className="w-full rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-2xl shadow-black/30">
                        <h1 className="mb-2 text-2xl font-bold">Portfolio CMS</h1>
                        <p className="mb-6 text-sm text-slate-400">Enter the admin password to edit all portfolio content.</p>
                        <label className="mb-4 block">
                            <span className="mb-1.5 block text-sm text-slate-300">Password</span>
                            <input
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-indigo-400"
                                autoFocus
                                required
                            />
                        </label>
                        {error && <p className="mb-4 text-sm text-red-300">{error}</p>}
                        <button className="w-full rounded-lg bg-indigo-500 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-400">
                            Unlock CMS
                        </button>
                    </form>
                </div>
            </main>
        );
    }

    if (!draft) {
        return <main className="min-h-screen bg-slate-950 p-8 text-white">Loading...</main>;
    }

    return (
        <main className="min-h-screen bg-slate-950 px-4 py-6 text-white sm:px-6">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-4 border-b border-slate-800 pb-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold">Portfolio CMS</h1>
                        <p className="text-sm text-slate-400">Edit page copy, profile details, publications, projects, art, articles, and skills.</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <button onClick={save} disabled={isSaving} className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-400 disabled:opacity-60">
                            {isSaving ? 'Saving...' : 'Save changes'}
                        </button>
                        <button onClick={() => setIsAuthenticated(false)} className="rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-200 hover:border-slate-500">
                            Lock
                        </button>
                    </div>
                </header>

                {(status || error) && (
                    <div className={`mb-4 rounded-lg border px-4 py-3 text-sm ${error ? 'border-red-500/40 bg-red-500/10 text-red-200' : 'border-emerald-500/40 bg-emerald-500/10 text-emerald-200'}`}>
                        {error || status}
                    </div>
                )}

                <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-medium capitalize ${activeTab === tab ? 'bg-indigo-500 text-white' : 'bg-slate-900 text-slate-300 hover:bg-slate-800'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="space-y-5">
                    {activeTab === 'site' && (
                        <>
                            {objectList('Navigation Item', ['site', 'navigation'], [
                                { key: 'name', label: 'Label' },
                                { key: 'href', label: 'Link' },
                            ], { name: '', href: '' })}
                            {objectList('Focus Item', ['site', 'home', 'currentFocus', 'items'], [
                                { key: 'title', label: 'Title' },
                                { key: 'icon', label: 'Icon', type: 'select', options: ['database', 'palette'] },
                            ], { title: '', icon: 'database' })}
                            {siteSections.map(([title, fields]) => (
                                <section key={String(title)} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                    <h2 className="mb-4 text-lg font-semibold text-white">{title}</h2>
                                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                        {fields.map((item, index) => (
                                            <div key={index} className="min-w-0">{item}</div>
                                        ))}
                                    </div>
                                </section>
                            ))}
                        </>
                    )}

                    {activeTab === 'personal' && (
                        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                            <h2 className="mb-4 text-lg font-semibold">Personal Details</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {field(['personal', 'name'], 'Name')}
                                {field(['personal', 'title'], 'Title')}
                                {field(['personal', 'bio'], 'Bio', 'textarea')}
                                {field(['personal', 'email'], 'Email')}
                                {field(['personal', 'location'], 'Location')}
                                {field(['personal', 'social', 'github'], 'GitHub URL')}
                                {field(['personal', 'social', 'linkedin'], 'LinkedIn URL')}
                                {field(['personal', 'social', 'googleScholar'], 'Google Scholar URL')}
                                {field(['personal', 'social', 'twitter'], 'Twitter URL')}
                                {field(['personal', 'social', 'medium'], 'Medium URL')}
                                {field(['personal', 'social', 'instagram'], 'Instagram URL')}
                            </div>
                        </section>
                    )}

                    {activeTab === 'about' && (
                        <>
                            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                <h2 className="mb-4 text-lg font-semibold">About Page Copy</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {field(['about', 'intro'], 'Short intro', 'textarea')}
                                    {field(['about', 'description'], 'Description', 'textarea')}
                                    {field(['site', 'aboutPage', 'profileSubtitle'], 'Profile subtitle')}
                                    {field(['site', 'aboutPage', 'profileImage'], 'Profile image path')}
                                    {field(['site', 'aboutPage', 'aboutTitle'], 'About title')}
                                    {field(['site', 'aboutPage', 'aboutParagraphs'], 'About paragraphs', 'list')}
                                    {field(['site', 'aboutPage', 'smallThingsTitle'], 'Small things title')}
                                    {field(['site', 'aboutPage', 'smallThingsDescription'], 'Small things description')}
                                    {field(['site', 'aboutPage', 'currentlyTitle'], 'Currently title')}
                                    {field(['site', 'aboutPage', 'currentlyDescription'], 'Currently description')}
                                </div>
                            </section>
                            {objectList('Current Work', ['about', 'currentlyWorkingOn'], [
                                { key: 'title', label: 'Title' },
                                { key: 'description', label: 'Description', type: 'textarea' },
                            ], { title: '', description: '' })}
                            {objectList('Small Thing', ['site', 'aboutPage', 'smallThings'], [
                                { key: 'label', label: 'Label' },
                                { key: 'icon', label: 'Icon', type: 'select', options: ['coffee', 'mandala', 'organize', 'zumba'] },
                            ], { label: '', icon: 'coffee' })}
                            {objectList('Currently Item', ['site', 'aboutPage', 'currently'], [
                                { key: 'label', label: 'Label' },
                                { key: 'value', label: 'Value' },
                                { key: 'icon', label: 'Icon', type: 'select', options: ['book', 'headphones', 'heart'] },
                            ], { label: '', value: '', icon: 'book' })}
                        </>
                    )}

                    {activeTab === 'work' && (
                        <>
                            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                <h2 className="mb-4 text-lg font-semibold">Work Page Labels</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {field(['site', 'workPage', 'title'], 'Title')}
                                    {field(['site', 'workPage', 'description'], 'Description', 'textarea')}
                                    {field(['site', 'workPage', 'resumeLabel'], 'Resume label')}
                                    {field(['site', 'workPage', 'resumeHref'], 'Resume link')}
                                    {field(['site', 'workPage', 'experienceTitle'], 'Experience title')}
                                    {field(['site', 'workPage', 'educationTitle'], 'Education title')}
                                    {field(['site', 'workPage', 'skillsTitle'], 'Skills title')}
                                    {field(['site', 'workPage', 'projectsTitle'], 'Projects title')}
                                    {field(['site', 'workPage', 'thesisTitle'], 'Thesis title')}
                                    {field(['site', 'workPage', 'thesisLinkLabel'], 'Thesis link label')}
                                    {field(['site', 'workPage', 'publicationsTitle'], 'Publications title')}
                                    {field(['site', 'workPage', 'publicationLinkLabel'], 'Publication link label')}
                                    {field(['site', 'workPage', 'doiLabel'], 'DOI label')}
                                </div>
                            </section>
                            {objectList('Experience', ['about', 'experience'], [
                                { key: 'role', label: 'Role' },
                                { key: 'company', label: 'Company' },
                                { key: 'period', label: 'Period' },
                                { key: 'type', label: 'Type' },
                                { key: 'location', label: 'Location' },
                                { key: 'description', label: 'Description', type: 'textarea' },
                            ], blankExperience)}
                            {objectList('Education', ['about', 'education'], [
                                { key: 'degree', label: 'Degree' },
                                { key: 'institution', label: 'Institution' },
                                { key: 'period', label: 'Period' },
                                { key: 'field', label: 'Field' },
                                { key: 'logo', label: 'Logo path' },
                            ], blankEducation)}
                        </>
                    )}

                    {activeTab === 'research' && (
                        <>
                            <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                                <h2 className="mb-4 text-lg font-semibold">Research Overview</h2>
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {field(['research', 'description'], 'Research description', 'textarea')}
                                    {field(['research', 'thesis', 'title'], 'Thesis title')}
                                    {field(['research', 'thesis', 'url'], 'Thesis URL')}
                                </div>
                            </section>
                            {objectList('Publication', ['research', 'publications'], [
                                { key: 'title', label: 'Title', type: 'textarea' },
                                { key: 'venue', label: 'Venue' },
                                { key: 'year', label: 'Year' },
                                { key: 'authors', label: 'Authors', type: 'textarea' },
                                { key: 'url', label: 'URL' },
                                { key: 'type', label: 'Type' },
                                { key: 'doi', label: 'DOI URL' },
                                { key: 'pdfUrl', label: 'PDF URL' },
                            ], blankPublication)}
                        </>
                    )}

                    {activeTab === 'projects' && objectList('Project', ['projects'], [
                        { key: 'title', label: 'Title' },
                        { key: 'category', label: 'Category' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'technologies', label: 'Technologies', type: 'list' },
                        { key: 'status', label: 'Status' },
                        { key: 'progress', label: 'Progress', type: 'number' },
                        { key: 'image', label: 'Image path' },
                        { key: 'githubUrl', label: 'GitHub URL' },
                        { key: 'liveUrl', label: 'Live URL' },
                        { key: 'pdfUrl', label: 'PDF URL' },
                        { key: 'featured', label: 'Featured', type: 'checkbox' },
                    ], blankProject)}

                    {activeTab === 'art' && objectList('Art Piece', ['art'], [
                        { key: 'title', label: 'Title' },
                        { key: 'description', label: 'Description', type: 'textarea' },
                        { key: 'image', label: 'Image path' },
                        { key: 'category', label: 'Category' },
                        { key: 'date', label: 'Date' },
                    ], blankArt)}

                    {activeTab === 'blogs' && objectList('Article', ['blogs'], [
                        { key: 'title', label: 'Title' },
                        { key: 'category', label: 'Category' },
                        { key: 'excerpt', label: 'Excerpt', type: 'textarea' },
                        { key: 'date', label: 'Date' },
                        { key: 'readTime', label: 'Read time' },
                        { key: 'url', label: 'URL' },
                        { key: 'image', label: 'Image path' },
                        { key: 'featured', label: 'Featured', type: 'checkbox' },
                    ], blankBlog)}

                    {activeTab === 'skills' && (
                        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                            <h2 className="mb-4 text-lg font-semibold">Skills</h2>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {field(['skills', 'languages'], 'Languages', 'list')}
                                {field(['skills', 'researchAndML'], 'Research & ML', 'list')}
                                {field(['skills', 'dataAndIoT'], 'Data & IoT', 'list')}
                                {field(['skills', 'web'], 'Web', 'list')}
                                {field(['skills', 'tools'], 'Tools', 'list')}
                            </div>
                        </section>
                    )}

                    {activeTab === 'json' && (
                        <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
                            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                <h2 className="text-lg font-semibold">Raw JSON</h2>
                                <button onClick={applyJson} className="rounded-lg bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400">Apply JSON</button>
                            </div>
                            {jsonError && <p className="mb-3 rounded-lg border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-200">{jsonError}</p>}
                            <textarea
                                value={jsonText}
                                onChange={(event) => setJsonText(event.target.value)}
                                spellCheck={false}
                                className="min-h-[70vh] w-full rounded-lg border border-slate-700 bg-slate-950 p-4 font-mono text-xs leading-relaxed text-slate-100 outline-none focus:border-indigo-400"
                            />
                        </section>
                    )}
                </div>
            </div>
        </main>
    );
}
