import Link from 'next/link';
import Image from 'next/image';
import type { Art } from '@/lib/data';
import SpotlightCard from '@/components/SpotlightCard';

interface ArtGallerySectionProps {
  artPieces: Art[];
}

export function ArtGallerySection({ artPieces }: ArtGallerySectionProps) {
  if (artPieces.length === 0) return null;

  const featured = artPieces[0];
  const thumbnails = artPieces.slice(1);

  return (
    <section className="py-16 px-6 relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-[#C9D3EE] to-[#818CF8] bg-clip-text text-transparent">Creative Expression</span>
          </h2>
          <p className="text-[#C9D3EE] text-base leading-relaxed max-w-2xl">
            Exploring the intersection of creativity and visual storytelling through digital art.
          </p>
        </div>

        {/* Featured + Thumbnails Layout */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Featured - Left column (60%) */}
          <div className="md:col-span-3">
            <SpotlightCard className="h-full">
              <div className="group overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1826]/80 via-[#171926]/70 to-[#0F0F1E]/60 backdrop-blur-md border border-[#6366F1]/20 hover:border-[#6366F1]/40 transition-all h-full cursor-pointer">
                <div className="aspect-[3/4] bg-[#1E2133] relative overflow-hidden">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  {/* Overlay gradient - visible on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Content - shown on hover */}
                  <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h4 className="font-semibold text-white text-lg mb-2">{featured.title}</h4>
                    <p className="text-sm text-[#C9D3EE] mb-3">{featured.description}</p>
                    <span className="inline-flex w-fit px-3 py-1 bg-[#6366F1]/20 text-[#818CF8] text-xs font-medium rounded-full border border-[#6366F1]/40">
                      {featured.category}
                    </span>
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </div>

          {/* Thumbnails - Right column (40%) */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {thumbnails.map((art) => (
              <SpotlightCard key={art.id} className="flex-1">
                <div className="group overflow-hidden rounded-xl bg-gradient-to-br from-[#1A1826]/70 via-[#171926]/60 to-[#0F0F1E]/50 backdrop-blur-md border border-[#6366F1]/20 hover:border-[#6366F1]/40 transition-all h-full cursor-pointer">
                  <div className="aspect-[4/3] bg-[#1E2133] relative overflow-hidden">
                    <Image
                      src={art.image}
                      alt={art.title}
                      fill
                      className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      quality={75}
                      sizes="(max-width: 768px) 100vw, 40vw"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000000] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    {/* Content - shown on hover */}
                    <div className="absolute inset-0 flex flex-col justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h4 className="font-semibold text-white text-sm mb-1">{art.title}</h4>
                      <span className="inline-flex w-fit px-2 py-0.5 bg-[#6366F1]/20 text-[#818CF8] text-xs font-medium rounded-full border border-[#6366F1]/40">
                        {art.category}
                      </span>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>

        <div className="mt-8">
          <Link href="/art" className="inline-flex items-center gap-2 text-sm text-[#6366F1] hover:text-[#818CF8] font-medium transition-colors">
            View All Art
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
