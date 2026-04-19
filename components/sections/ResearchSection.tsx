import type { Research } from '@/lib/data';
import SpotlightCard from '@/components/SpotlightCard';
import { BookOpen, GraduationCap, ExternalLink } from 'lucide-react';

interface ResearchSectionProps {
  research: Research;
}

export function ResearchSection({ research }: ResearchSectionProps) {

  return (
    <section className="py-16 px-6 relative overflow-hidden bg-gradient-to-b from-[#6366F1]/6 via-transparent to-transparent">
      <div className="max-w-6xl mx-auto">
        {/* Section Heading */}
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Research & Publications</span>
          </h2>
          <p className="text-[#C9D3EE] text-base leading-relaxed max-w-2xl">
            Exploring data science, machine learning, and computer vision through academic research and published findings.
          </p>
        </div>

        {/* Thesis - Feature Card */}
        <div className="mb-12">
          <div className="flex items-center gap-2 mb-6">
            <GraduationCap className="w-5 h-5 text-[#818CF8]" />
            <h3 className="text-lg font-semibold text-white">Thesis</h3>
          </div>
          <SpotlightCard>
            <div className="relative bg-gradient-to-br from-[#1A1826]/80 via-[#171926]/70 to-[#0F0F1E]/60 backdrop-blur-md border border-[#6366F1]/25 rounded-xl p-8 overflow-hidden group hover:border-[#6366F1]/40 transition-colors">
              {/* Left accent strip */}
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#6366F1] via-[#818CF8] to-transparent" />

              <p className="text-[#E0E7FF] text-lg leading-relaxed mb-8 pl-6 italic">
                "{research.description}"
              </p>
              {research.thesis.url && (
                <div className="pl-6">
                  <a
                    href={research.thesis.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-[#6366F1] hover:bg-[#818CF8] text-white text-sm font-medium rounded-lg transition-all duration-200"
                  >
                    Read Thesis
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}
            </div>
          </SpotlightCard>
        </div>

        {/* Publications - Timeline */}
        <div>
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="w-5 h-5 text-[#818CF8]" />
            <h3 className="text-lg font-semibold text-white">Publications</h3>
          </div>
          <div className="space-y-6">
            {research.publications.map((pub, index) => (
              <SpotlightCard key={pub.id}>
                <div className="bg-gradient-to-br from-[#1A1826]/70 via-[#171926]/60 to-[#0F0F1E]/50 backdrop-blur-md border border-[#6366F1]/20 rounded-xl p-7 hover:border-[#6366F1]/40 transition-all group">
                  <div className="flex gap-6">
                    {/* Number Indicator */}
                    <div className="flex-shrink-0">
                      <div className="text-5xl font-black bg-gradient-to-b from-[#6366F1] to-[#818CF8] bg-clip-text text-transparent select-none">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-3 flex-wrap">
                        <span className="px-2 py-0.5 bg-[#6366F1]/15 text-[#818CF8] text-xs font-medium rounded border border-[#6366F1]/20">
                          {pub.venue}
                        </span>
                        <span className="text-[#939DB8] text-xs">{pub.year}</span>
                        <span className="text-[#939DB8] text-xs">· {pub.type}</span>
                      </div>
                      <h4 className="text-lg font-semibold text-white mb-2 group-hover:text-[#E0E7FF] transition-colors leading-snug">
                        {pub.title}
                      </h4>
                      <p className="text-[#C9D3EE] text-sm mb-4">{pub.authors}</p>

                      {/* DOI and View Publication Links */}
                      <div className="flex items-center gap-3 pt-2 flex-wrap">
                        {pub.doi && (
                          <a
                            href={pub.doi}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#6366F1]/15 text-[#818CF8] text-xs font-medium rounded border border-[#6366F1]/30 hover:border-[#6366F1]/60 hover:text-[#C9D3EE] transition-colors"
                          >
                            DOI
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                        <a
                          href={pub.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-[#6366F1] hover:text-[#818CF8] text-xs font-medium transition-colors"
                        >
                          View Publication
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
