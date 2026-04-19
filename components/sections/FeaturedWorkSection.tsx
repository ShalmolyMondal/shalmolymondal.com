import Link from 'next/link';
import type { Project } from '@/lib/data';
import ProjectCard from '@/components/ProjectCard';

interface FeaturedWorkSectionProps {
  featuredProjects: Project[];
}

export function FeaturedWorkSection({ featuredProjects }: FeaturedWorkSectionProps) {

  return (
    <section className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Featured Work</span>
          </h2>
        </div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {featuredProjects.map((project, index) => (
            <div key={project.id}>
              <ProjectCard project={project} />
            </div>
          ))}
        </div>

        <div className="mt-10 ml-1">
          <Link href="/work" className="inline-flex items-center gap-2 text-sm text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors">
            View All Projects
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
