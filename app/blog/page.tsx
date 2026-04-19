import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import AnimatedGridBackground from '@/components/AnimatedGridBackground';
import FadeIn from '@/components/FadeIn';
import FlowingGradient from '@/components/FlowingGradient';
import { getBlogs } from '@/lib/data';

export default function BlogPage() {
    const blogs = getBlogs();

    return (
        <div className="min-h-screen bg-[#0B0C14] text-white relative overflow-hidden">
            <FlowingGradient />
            <Navigation />

            <AnimatedGridBackground className="pt-20 pb-16">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header - Improved Typography */}
                    <FadeIn direction="up">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#6366F1]/25 bg-[#6366F1]/5 text-xs text-[#818CF8] tracking-wider uppercase font-medium mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#6366F1] animate-pulse"></span>
                                Latest Writings
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight"><span className="bg-gradient-to-r from-white via-[#C9D3EE] to-[#6366F1] bg-clip-text text-transparent">Blog</span></h1>
                            <p className="text-base text-[#939DB8] max-w-2xl mx-auto leading-relaxed">
                                Thoughts on data engineering, technology, and more
                            </p>
                        </div>
                    </FadeIn>

                    {/* Bento Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {blogs.map((blog, index) => {
                            // First item spans full width, rest are normal
                            const spanClass = index === 0 ? 'md:col-span-3' : '';

                            return (
                                <div key={blog.id} className={spanClass}>
                                    <FadeIn direction="up" delay={index * 0.1}>
                                        <a
                                            href={blog.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className={`block h-full bg-gradient-to-br from-[#1A1826]/70 via-[#171926]/60 to-[#0F0F1E]/50 backdrop-blur-md border border-[#6366F1]/20 rounded-xl hover:border-[#6366F1]/40 transition-all group ${
                                                index === 0 ? 'p-8 md:p-10' : 'p-6'
                                            }`}

                                        >
                                                {/* Badges */}
                                                <div className="flex items-center gap-2 mb-3 flex-wrap">
                                                    <span className="px-2.5 py-1 bg-[#6366F1]/15 text-[#818CF8] text-xs font-medium rounded-full border border-[#6366F1]/20">
                                                        {blog.category}
                                                    </span>
                                                    {blog.featured && (
                                                        <span className="px-2.5 py-1 bg-[#4F46E5]/15 text-[#A5B4FC] text-xs font-medium rounded-full border border-[#4F46E5]/20">
                                                            Featured
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Title */}
                                                <h2 className={`font-bold mb-3 group-hover:text-[#E0E7FF] transition-colors leading-tight ${
                                                    index === 0 ? 'text-2xl md:text-4xl' : 'text-lg md:text-xl'
                                                }`}>
                                                    {blog.title}
                                                </h2>

                                                {/* Excerpt */}
                                                <p className={`text-[#C9D3EE] leading-relaxed mb-4 ${
                                                    index === 0 ? 'text-base md:text-lg line-clamp-3' : 'text-sm line-clamp-2'
                                                }`}>
                                                    {blog.excerpt}
                                                </p>

                                                {/* Meta Info */}
                                                <div className="flex items-center gap-3 text-xs text-[#939DB8]/70 mt-auto pt-3 border-t border-[#727DA1]/10">
                                                    <span>{blog.date}</span>
                                                    <span>•</span>
                                                    <span>{blog.readTime}</span>
                                                </div>

                                                {/* Read More Link */}
                                                <div className="flex items-center gap-2 text-[#6366F1] font-medium text-sm mt-3 group-hover:gap-3 transition-all">
                                                    Read Article
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                                    </svg>
                                                </div>
                                            </a>
                                        </FadeIn>
                                    </div>
                            );
                        })}
                    </div>
                </div>
            </AnimatedGridBackground>

            <Footer />
        </div>
    );
}
