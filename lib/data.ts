import fs from 'fs';
import path from 'path';
import { unstable_noStore as noStore } from 'next/cache';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export interface Social {
    github: string;
    linkedin: string;
    googleScholar?: string;
    twitter?: string;
    medium?: string;
    instagram?: string;
}

export interface Personal {
    name: string;
    title: string;
    bio: string;
    email: string;
    location: string;
    social: Social;
}

export interface CurrentWork {
    title: string;
    description: string;
}

export interface Experience {
    role: string;
    company: string;
    period: string;
    type?: string;
    location?: string;
    description: string;
}

export interface Education {
    degree: string;
    institution: string;
    period: string;
    field: string;
    logo?: string;
}

export interface About {
    intro: string;
    description: string;
    currentlyWorkingOn: CurrentWork[];
    experience: Experience[];
    education: Education[];
}

export interface Project {
    id: string;
    title: string;
    category: string;
    description: string;
    technologies: string[];
    status: string;
    progress: number;
    image: string;
    liveUrl?: string;
    githubUrl?: string;
    pdfUrl?: string;
    featured: boolean;
}

export interface Art {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    date: string;
}

export interface Blog {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    date: string;
    readTime: string;
    url: string;
    featured: boolean;
    image?: string;
}

export interface Publication {
    id: string;
    title: string;
    venue: string;
    year: string;
    authors: string;
    url: string;
    type: string;
    doi?: string;
    pdfUrl?: string;
}

export interface Thesis {
    title: string;
    url: string;
}

export interface Research {
    description: string;
    thesis: Thesis;
    publications: Publication[];
}

export interface Skills {
    languages: string[];
    researchAndML: string[];
    dataAndIoT: string[];
    web: string[];
    tools: string[];
}

export interface NavItem {
    name: string;
    href: string;
}

export interface HeroContent {
    badgeWords: string[];
    greetingPrefix: string;
    headlineSuffix: string;
    subheading: string;
    body: string;
    primaryCtaLabel: string;
    primaryCtaHref: string;
    secondaryCtaLabel: string;
    secondaryCtaHref: string;
}

export interface FocusItem {
    title: string;
    icon: 'database' | 'palette';
}

export interface CurrentFocusContent {
    title: string;
    description: string;
    items: FocusItem[];
}

export interface SectionIntro {
    title: string;
    description: string;
    ctaLabel?: string;
    ctaHref?: string;
}

export interface HomeContent {
    hero: HeroContent;
    currentFocus: CurrentFocusContent;
    artSection: SectionIntro;
    blogSection: SectionIntro;
}

export interface AboutSmallThing {
    label: string;
    icon: 'coffee' | 'mandala' | 'organize' | 'zumba';
}

export interface CurrentlyItem {
    label: string;
    value: string;
    icon: 'book' | 'headphones' | 'heart';
}

export interface AboutPageContent {
    profileSubtitle: string;
    profileImage: string;
    aboutTitle: string;
    aboutParagraphs: string[];
    smallThingsTitle: string;
    smallThingsDescription: string;
    smallThings: AboutSmallThing[];
    currentlyTitle: string;
    currentlyDescription: string;
    currently: CurrentlyItem[];
}

export interface WorkPageContent {
    title: string;
    description: string;
    resumeLabel: string;
    resumeHref: string;
    experienceTitle: string;
    educationTitle: string;
    skillsTitle: string;
    projectsTitle: string;
    thesisTitle: string;
    thesisLinkLabel: string;
    publicationsTitle: string;
    publicationLinkLabel: string;
    doiLabel: string;
}

export interface SimplePageContent {
    eyebrow?: string;
    title: string;
    description: string;
}

export interface ContactPageContent extends SimplePageContent {
    emailLabel: string;
    locationLabel: string;
    dividerLabel: string;
    ctaLabel: string;
}

export interface FooterContent {
    brand: string;
    description: string;
    quickLinksTitle: string;
    connectTitle: string;
    updatesTitle: string;
    updatesDescription: string;
    copyrightName: string;
}

export interface MetadataContent {
    title: string;
    description: string;
}

export interface UiLabels {
    featured: string;
    readArticle: string;
    projectProgress: string;
    viewCode: string;
    viewPaper: string;
    liveDemo: string;
}

export interface SiteContent {
    metadata: MetadataContent;
    navigation: NavItem[];
    navigationCta: NavItem;
    home: HomeContent;
    aboutPage: AboutPageContent;
    workPage: WorkPageContent;
    artPage: SimplePageContent;
    blogPage: SimplePageContent;
    contactPage: ContactPageContent;
    footer: FooterContent;
    loaderText: string;
    labels: UiLabels;
}

export interface PortfolioData {
    personal: Personal;
    about: About;
    research: Research;
    projects: Project[];
    art: Art[];
    blogs: Blog[];
    skills: Skills;
    site: SiteContent;
}

export const ADMIN_PASSWORD = 'shalmoly2024';

export const defaultSiteContent: SiteContent = {
    metadata: {
        title: 'Shalmoly - Data Engineer & Creative Soul',
        description: 'Portfolio of Shalmoly - Data Engineer passionate about building scalable data pipelines and creating beautiful digital experiences.',
    },
    navigation: [
        { name: 'Home', href: '/' },
        { name: 'About', href: '/about' },
        { name: 'Work', href: '/work' },
        { name: 'Art', href: '/art' },
        { name: 'Blog', href: '/blog' },
        { name: 'Contact', href: '/contact' },
    ],
    navigationCta: { name: 'Get in Touch', href: '/contact' },
    home: {
        hero: {
            badgeWords: ['Researcher', 'Data Engineer', 'Creative Soul'],
            greetingPrefix: 'Hi, I am',
            headlineSuffix: '!',
            subheading: 'Welcome to my digital sanctuary.',
            body: "I'm a data engineer, former researcher, and creative soul. Here, I share my work, my writing, and my art - thoughtfully brought together in one place.",
            primaryCtaLabel: 'Contact me here ->',
            primaryCtaHref: '/contact',
            secondaryCtaLabel: 'View My Work',
            secondaryCtaHref: '/work',
        },
        currentFocus: {
            title: 'Current Focus',
            description: 'Passionately invested in leveraging data to solve complex problems while building beautiful, functional digital experiences.',
            items: [
                { title: 'Working as a Data Engineer', icon: 'database' },
                { title: 'Creating thoughtful digital products', icon: 'palette' },
            ],
        },
        artSection: {
            title: 'Creative Expression',
            description: 'Exploring the intersection of creativity and visual storytelling through digital art.',
            ctaLabel: 'View All Art',
            ctaHref: '/art',
        },
        blogSection: {
            title: 'Blog & Insights',
            description: 'In-depth guides, technical insights, and reflections on data engineering, product development, and technology.',
            ctaLabel: 'Read All Articles',
            ctaHref: '/blog',
        },
    },
    aboutPage: {
        profileSubtitle: 'Data Engineer, Research, Creative Soul',
        profileImage: '/profile.jpg',
        aboutTitle: 'About Me',
        aboutParagraphs: [
            "Hey There! I'm Shalmoly, a Data Engineer, Research, Creative Soul based in Melbourne.",
            "I work with data and build systems that make complex information easy to digest. I'm naturally curious and enjoy experimenting with new tools and technologies.",
            "Beyond tech, I find balance in creativity and movement. I'm a moderately skilled keyboard player, an art enthusiast, and an avid reader. I enjoy designing intricate mandalas, and unwinding with coffee and a good book. These slower rituals ground me and bring a bit of calm to everyday chaos. I also love Zumba to keep me energised.",
            "So, a warm welcome to my calm corner of the web, a space where I bring together the different things I enjoy: my work, art, and writing. If something here resonates with you, I'm glad you stopped by.",
        ],
        smallThingsTitle: 'A few small things about me',
        smallThingsDescription: 'Little moments that bring me joy.',
        smallThings: [
            { label: 'Coffee + books calm me down', icon: 'coffee' },
            { label: 'I design mandalas to unwind', icon: 'mandala' },
            { label: 'I love organizing things', icon: 'organize' },
            { label: 'Zumba recharges my mind', icon: 'zumba' },
        ],
        currentlyTitle: 'Currently',
        currentlyDescription: "What I'm into right now.",
        currently: [
            { label: 'Reading', value: 'Let Them Theory, Mel Robbins', icon: 'book' },
            { label: 'Listening', value: 'A Thousand Years, Christina Perri', icon: 'headphones' },
            { label: 'Enjoying', value: 'Quiet Afternoons with my New Born', icon: 'heart' },
        ],
    },
    workPage: {
        title: 'My Work',
        description: "From research to production - projects I've built and academic contributions",
        resumeLabel: 'Download Resume',
        resumeHref: '/resume.pdf',
        experienceTitle: 'Experience',
        educationTitle: 'Education',
        skillsTitle: 'Skills',
        projectsTitle: 'Projects',
        thesisTitle: 'Thesis',
        thesisLinkLabel: 'Read Thesis',
        publicationsTitle: 'Publications',
        publicationLinkLabel: 'View Publication',
        doiLabel: 'DOI',
    },
    artPage: {
        title: 'Art Gallery',
        description: 'Creative expressions and digital art',
    },
    blogPage: {
        eyebrow: 'Latest Writings',
        title: 'Blog',
        description: 'Thoughts on data engineering, technology, and more',
    },
    contactPage: {
        eyebrow: "Let's Connect",
        title: 'Get In Touch',
        description: "I'm always open to new opportunities and collaborations",
        emailLabel: 'Email',
        locationLabel: 'Location',
        dividerLabel: 'or connect via',
        ctaLabel: 'Send Me an Email',
    },
    footer: {
        brand: 'Shalmoly',
        description: 'Data Engineer passionate about building scalable data pipelines and creating beautiful digital experiences.',
        quickLinksTitle: 'Quick Links',
        connectTitle: 'Connect',
        updatesTitle: 'Updates',
        updatesDescription: 'Occasional notes on data, research, and creative work.',
        copyrightName: 'Shalmoly',
    },
    loaderText: 'Shalmoly',
    labels: {
        featured: 'Featured',
        readArticle: 'Read Article',
        projectProgress: 'Progress',
        viewCode: 'View Code',
        viewPaper: 'View Paper',
        liveDemo: 'Live Demo',
    },
};

function mergeSiteContent(site?: Partial<SiteContent>): SiteContent {
    return {
        ...defaultSiteContent,
        ...site,
        metadata: { ...defaultSiteContent.metadata, ...site?.metadata },
        navigation: site?.navigation ?? defaultSiteContent.navigation,
        navigationCta: { ...defaultSiteContent.navigationCta, ...site?.navigationCta },
        home: {
            ...defaultSiteContent.home,
            ...site?.home,
            hero: { ...defaultSiteContent.home.hero, ...site?.home?.hero },
            currentFocus: {
                ...defaultSiteContent.home.currentFocus,
                ...site?.home?.currentFocus,
                items: site?.home?.currentFocus?.items ?? defaultSiteContent.home.currentFocus.items,
            },
            artSection: { ...defaultSiteContent.home.artSection, ...site?.home?.artSection },
            blogSection: { ...defaultSiteContent.home.blogSection, ...site?.home?.blogSection },
        },
        aboutPage: {
            ...defaultSiteContent.aboutPage,
            ...site?.aboutPage,
            aboutParagraphs: site?.aboutPage?.aboutParagraphs ?? defaultSiteContent.aboutPage.aboutParagraphs,
            smallThings: site?.aboutPage?.smallThings ?? defaultSiteContent.aboutPage.smallThings,
            currently: site?.aboutPage?.currently ?? defaultSiteContent.aboutPage.currently,
        },
        workPage: { ...defaultSiteContent.workPage, ...site?.workPage },
        artPage: { ...defaultSiteContent.artPage, ...site?.artPage },
        blogPage: { ...defaultSiteContent.blogPage, ...site?.blogPage },
        contactPage: { ...defaultSiteContent.contactPage, ...site?.contactPage },
        footer: { ...defaultSiteContent.footer, ...site?.footer },
        labels: { ...defaultSiteContent.labels, ...site?.labels },
    };
}

function normalizePortfolioData(data: PortfolioData | (Omit<PortfolioData, 'site'> & { site?: Partial<SiteContent> })): PortfolioData {
    return {
        ...data,
        site: mergeSiteContent(data.site),
    };
}

export function getPortfolioData(): PortfolioData {
    noStore();
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return normalizePortfolioData(JSON.parse(fileContents));
}

// Write portfolio data
export function savePortfolioData(data: PortfolioData): void {
    const normalizedData = normalizePortfolioData(data);
    fs.writeFileSync(dataFilePath, `${JSON.stringify(normalizedData, null, 2)}\n`, 'utf8');
}

// Get specific sections
export function getPersonalInfo(): Personal {
    return getPortfolioData().personal;
}

export function getAbout(): About {
    return getPortfolioData().about;
}

export function getProjects(): Project[] {
    return getPortfolioData().projects;
}

export function getFeaturedProjects(): Project[] {
    return getPortfolioData().projects.filter(p => p.featured);
}

export function getArt(): Art[] {
    return getPortfolioData().art;
}

export function getBlogs(): Blog[] {
    return getPortfolioData().blogs;
}

export function getFeaturedBlogs(): Blog[] {
    return getPortfolioData().blogs.filter(b => b.featured);
}

export function getSkills(): Skills {
    return getPortfolioData().skills;
}

export function getResearch(): Research {
    return getPortfolioData().research;
}

export function getSiteContent(): SiteContent {
    return getPortfolioData().site;
}

// CRUD operations for admin
export function addProject(project: Omit<Project, 'id'>): Project {
    const data = getPortfolioData();
    const newProject = {
        ...project,
        id: Date.now().toString(),
    };
    data.projects.push(newProject);
    savePortfolioData(data);
    return newProject;
}

export function updateProject(id: string, updates: Partial<Project>): Project | null {
    const data = getPortfolioData();
    const index = data.projects.findIndex(p => p.id === id);
    if (index === -1) return null;

    data.projects[index] = { ...data.projects[index], ...updates };
    savePortfolioData(data);
    return data.projects[index];
}

export function deleteProject(id: string): boolean {
    const data = getPortfolioData();
    const index = data.projects.findIndex(p => p.id === id);
    if (index === -1) return false;

    data.projects.splice(index, 1);
    savePortfolioData(data);
    return true;
}

export function addArt(art: Omit<Art, 'id'>): Art {
    const data = getPortfolioData();
    const newArt = {
        ...art,
        id: Date.now().toString(),
    };
    data.art.push(newArt);
    savePortfolioData(data);
    return newArt;
}

export function updateArt(id: string, updates: Partial<Art>): Art | null {
    const data = getPortfolioData();
    const index = data.art.findIndex(a => a.id === id);
    if (index === -1) return null;

    data.art[index] = { ...data.art[index], ...updates };
    savePortfolioData(data);
    return data.art[index];
}

export function deleteArt(id: string): boolean {
    const data = getPortfolioData();
    const index = data.art.findIndex(a => a.id === id);
    if (index === -1) return false;

    data.art.splice(index, 1);
    savePortfolioData(data);
    return true;
}

export function addBlog(blog: Omit<Blog, 'id'>): Blog {
    const data = getPortfolioData();
    const newBlog = {
        ...blog,
        id: Date.now().toString(),
    };
    data.blogs.push(newBlog);
    savePortfolioData(data);
    return newBlog;
}

export function updateBlog(id: string, updates: Partial<Blog>): Blog | null {
    const data = getPortfolioData();
    const index = data.blogs.findIndex(b => b.id === id);
    if (index === -1) return null;

    data.blogs[index] = { ...data.blogs[index], ...updates };
    savePortfolioData(data);
    return data.blogs[index];
}

export function deleteBlog(id: string): boolean {
    const data = getPortfolioData();
    const index = data.blogs.findIndex(b => b.id === id);
    if (index === -1) return false;

    data.blogs.splice(index, 1);
    savePortfolioData(data);
    return true;
}

export function updatePersonalInfo(updates: Partial<Personal>): Personal {
    const data = getPortfolioData();
    data.personal = { ...data.personal, ...updates };
    savePortfolioData(data);
    return data.personal;
}

export function updateAbout(updates: Partial<About>): About {
    const data = getPortfolioData();
    data.about = { ...data.about, ...updates };
    savePortfolioData(data);
    return data.about;
}
