import Link from 'next/link';
import Image from 'next/image';
import type { Blog } from '@/lib/data';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { BookOpen } from 'lucide-react';

interface BlogSectionProps {
  blogs: Blog[];
}

export function BlogSection({ blogs }: BlogSectionProps) {

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-[#6366F1]/6 via-transparent to-transparent">
      {/* Top border gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Blog & Insights</span>
          </h2>
          <p className="text-[#C9D3EE] text-base leading-relaxed max-w-2xl">
            In-depth guides, technical insights, and reflections on data engineering, product development, and technology.
          </p>
        </div>

        <BentoGrid className="md:grid-cols-2">
          {blogs.map((blog, i) => (
            <BentoGridItem
              key={blog.id}
              title={blog.title}
              description={blog.excerpt}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden border border-white/10 relative group">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
                  )}
                  {/* Featured badge overlay */}
                  {i === 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 bg-[#6366F1] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        Featured
                      </span>
                    </div>
                  )}
                </div>
              }
              icon={<BookOpen className="h-4 w-4 text-[#818CF8]" />}
              className={i === 2 || i === 3 || i === 6 ? "md:col-span-2" : ""}
              url={blog.url}
              category={blog.category}
              date={blog.date}
            />
          ))}
        </BentoGrid>

        <div className="mt-10 text-center">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors">
            Read All Articles
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
