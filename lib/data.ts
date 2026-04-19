import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export interface Social {
    github: string;
    linkedin: string;
    googleScholar?: string;
    twitter?: string;
    medium?: string;
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

export interface PortfolioData {
    personal: Personal;
    about: About;
    research: Research;
    projects: Project[];
    art: Art[];
    blogs: Blog[];
    skills: Skills;
}

// Cached portfolio data — avoids re-reading and re-parsing JSON on every call
let cachedData: PortfolioData | null = null;

export function getPortfolioData(): PortfolioData {
    if (!cachedData) {
        const fileContents = fs.readFileSync(dataFilePath, 'utf8');
        cachedData = JSON.parse(fileContents);
    }
    return cachedData!;
}

// Write portfolio data
export function savePortfolioData(data: PortfolioData): void {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
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
