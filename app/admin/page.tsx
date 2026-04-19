'use client';

import { useState, useEffect } from 'react';
import { PortfolioData } from '@/lib/data';

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [portfolioData, setPortfolioData] = useState<PortfolioData | null>(null);
    const [activeTab, setActiveTab] = useState<'projects' | 'art' | 'blogs' | 'personal' | 'about'>('projects');
    const [editingItem, setEditingItem] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isAuthenticated) {
            fetchData();
        }
    }, [isAuthenticated]);

    const fetchData = async () => {
        try {
            const response = await fetch('/api/portfolio');
            const data = await response.json();
            setPortfolioData(data);
        } catch (err) {
            console.error('Failed to fetch data:', err);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/portfolio', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password }),
            });

            if (response.ok) {
                setIsAuthenticated(true);
                setPassword('');
            } else {
                setError('Invalid password');
            }
        } catch (err) {
            setError('Authentication failed');
        } finally {
            setIsLoading(false);
        }
    };

    const handleSaveData = async () => {
        if (!portfolioData) return;
        setIsLoading(true);

        try {
            const response = await fetch('/api/portfolio', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password: 'shalmoly2024', data: portfolioData }),
            });

            if (response.ok) {
                alert('Data saved successfully!');
            } else {
                alert('Failed to save data');
            }
        } catch (err) {
            alert('Failed to save data');
        } finally {
            setIsLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="max-w-md w-full px-6">
                    <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
                        <h1 className="text-3xl font-bold mb-6 text-center">Admin Login</h1>
                        <form onSubmit={handleLogin}>
                            <div className="mb-6">
                                <label className="block text-sm font-medium mb-2">Password</label>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                    placeholder="Enter admin password"
                                    required
                                />
                            </div>
                            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg font-semibold transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }

    if (!portfolioData) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-4xl font-bold">Admin Panel</h1>
                    <div className="flex gap-4">
                        <button
                            onClick={handleSaveData}
                            disabled={isLoading}
                            className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-semibold transition-colors disabled:opacity-50"
                        >
                            {isLoading ? 'Saving...' : 'Save All Changes'}
                        </button>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-8 overflow-x-auto">
                    {(['projects', 'art', 'blogs', 'personal', 'about'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-6 py-3 rounded-lg font-semibold transition-colors capitalize ${activeTab === tab
                                    ? 'bg-red-500 text-white'
                                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8">
                    {activeTab === 'projects' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
                            <div className="space-y-4">
                                {portfolioData.projects.map((project, index) => (
                                    <div key={project.id} className="bg-gray-800 border border-gray-700 rounded-lg p-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Title</label>
                                                <input
                                                    type="text"
                                                    value={project.title}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].title = e.target.value;
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Category</label>
                                                <input
                                                    type="text"
                                                    value={project.category}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].category = e.target.value;
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                />
                                            </div>
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-medium mb-2">Description</label>
                                                <textarea
                                                    value={project.description}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].description = e.target.value;
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                    rows={3}
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Status</label>
                                                <input
                                                    type="text"
                                                    value={project.status}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].status = e.target.value;
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Progress (%)</label>
                                                <input
                                                    type="number"
                                                    value={project.progress}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].progress = parseInt(e.target.value);
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">GitHub URL</label>
                                                <input
                                                    type="text"
                                                    value={project.githubUrl || ''}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].githubUrl = e.target.value;
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-medium mb-2">Live URL</label>
                                                <input
                                                    type="text"
                                                    value={project.liveUrl || ''}
                                                    onChange={(e) => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects[index].liveUrl = e.target.value;
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                                />
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <label className="flex items-center gap-2">
                                                    <input
                                                        type="checkbox"
                                                        checked={project.featured}
                                                        onChange={(e) => {
                                                            const newData = { ...portfolioData };
                                                            newData.projects[index].featured = e.target.checked;
                                                            setPortfolioData(newData);
                                                        }}
                                                        className="w-5 h-5"
                                                    />
                                                    <span className="text-sm font-medium">Featured</span>
                                                </label>
                                                <button
                                                    onClick={() => {
                                                        const newData = { ...portfolioData };
                                                        newData.projects.splice(index, 1);
                                                        setPortfolioData(newData);
                                                    }}
                                                    className="ml-auto px-4 py-2 bg-red-500 hover:bg-red-600 rounded-lg text-sm font-semibold transition-colors"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === 'personal' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Personal Information</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-2">Name</label>
                                    <input
                                        type="text"
                                        value={portfolioData.personal.name}
                                        onChange={(e) => {
                                            const newData = { ...portfolioData };
                                            newData.personal.name = e.target.value;
                                            setPortfolioData(newData);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Title</label>
                                    <input
                                        type="text"
                                        value={portfolioData.personal.title}
                                        onChange={(e) => {
                                            const newData = { ...portfolioData };
                                            newData.personal.title = e.target.value;
                                            setPortfolioData(newData);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Bio</label>
                                    <textarea
                                        value={portfolioData.personal.bio}
                                        onChange={(e) => {
                                            const newData = { ...portfolioData };
                                            newData.personal.bio = e.target.value;
                                            setPortfolioData(newData);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                        rows={4}
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Email</label>
                                    <input
                                        type="email"
                                        value={portfolioData.personal.email}
                                        onChange={(e) => {
                                            const newData = { ...portfolioData };
                                            newData.personal.email = e.target.value;
                                            setPortfolioData(newData);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={portfolioData.personal.location}
                                        onChange={(e) => {
                                            const newData = { ...portfolioData };
                                            newData.personal.location = e.target.value;
                                            setPortfolioData(newData);
                                        }}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-red-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Similar sections for art, blogs, and about can be added */}
                    {activeTab === 'art' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Manage Art</h2>
                            <p className="text-gray-400">Art management interface - similar to projects</p>
                        </div>
                    )}

                    {activeTab === 'blogs' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Manage Blogs</h2>
                            <p className="text-gray-400">Blog management interface - similar to projects</p>
                        </div>
                    )}

                    {activeTab === 'about' && (
                        <div>
                            <h2 className="text-2xl font-bold mb-6">Manage About</h2>
                            <p className="text-gray-400">About section management interface</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
