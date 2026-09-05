import Link from 'next/link';
import Image from 'next/image';
import type { Blog, SectionIntro, UiLabels } from '@/lib/data';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import { BookOpen } from 'lucide-react';

interface BlogSectionProps {
  blogs: Blog[];
  content: SectionIntro;
  labels: UiLabels;
}

export function BlogSection({ blogs, content, labels }: BlogSectionProps) {

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-[#6366F1]/6 via-transparent to-transparent">
      {/* Top border gradient separator */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#6366F1]/50 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-(color:--s-text-2) to-(color:--s-accent-2) bg-clip-text text-transparent">{content.title}</span>
          </h2>
          <p className="text-(--s-text-2) text-base leading-relaxed max-w-2xl">
            {content.description}
          </p>
        </div>

        <BentoGrid className="md:grid-cols-2">
          {blogs.map((blog, i) => (
            <BentoGridItem
              key={blog.id}
              title={blog.title}
              description={blog.excerpt}
              header={
                <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden border border-(color:--s-fg)/10 relative group">
                  {blog.image ? (
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) calc(100vw - 3rem), 560px"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-neutral-900 to-neutral-800" />
                  )}
                  {/* Featured badge overlay */}
                  {i === 0 && (
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 bg-[#6366F1] text-white text-xs font-bold rounded-full uppercase tracking-wider">
                        {labels.featured}
                      </span>
                    </div>
                  )}
                </div>
              }
              icon={<BookOpen className="h-4 w-4 text-(--s-accent-2)" />}
              className={i === 2 || i === 3 || i === 6 ? "md:col-span-2" : ""}
              url={blog.url}
              category={blog.category}
              date={blog.date}
            />
          ))}
        </BentoGrid>

        <div className="mt-10 text-center">
          <Link href={content.ctaHref ?? '/blog'} className="inline-flex items-center gap-2 text-sm text-[#6366F1] hover:text-(--s-accent-2) font-medium transition-colors">
            {content.ctaLabel ?? 'Read All Articles'}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
