import Image from 'next/image';
import { getArt, getSiteContent } from '@/lib/data';

export default function ArtPage() {
    const artPieces = getArt();
    const content = getSiteContent().artPage;

    return (
        <div className="min-h-screen bg-(--s-bg) text-(--s-fg)">

            <main className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="bg-gradient-to-r from-(color:--s-fg) via-(color:--s-text-2) to-[#6366F1] bg-clip-text text-transparent">{content.title}</span></h1>
                        <p className="text-xl text-(--s-muted)">
                            {content.description}
                        </p>
                    </div>

                    {/* Art Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artPieces.map((art) => (
                            <div
                                key={art.id}
                                className="group relative overflow-hidden rounded-xl bg-(--s-card) border border-(color:--s-line)/15 hover:border-[#6366F1]/40 transition-all hover:shadow-2xl hover:shadow-[#6366F1]/10"
                            >
                                {/* Art Image */}
                                <div className="aspect-square bg-gradient-to-br from-[#6366F1]/20 via-(color:--s-accent-2)/15 to-[#4F46E5]/20 flex items-center justify-center relative overflow-hidden">
                                    <Image
                                        src={art.image}
                                        alt={art.title}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                        quality={75}
                                        sizes="(max-width: 768px) calc(100vw - 3rem), (max-width: 1200px) 50vw, 410px"
                                    />
                                </div>

                                {/* Art Info */}
                                <div className="p-6">
                                    <div className="text-sm text-(--s-muted) mb-2">{art.category}</div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#6366F1] transition-colors">
                                        {art.title}
                                    </h3>
                                    <p className="text-(--s-muted) text-sm mb-3">{art.description}</p>
                                    {art.date && <div className="text-xs text-(--s-muted)">{art.date}</div>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

        </div>
    );
}
