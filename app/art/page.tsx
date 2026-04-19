import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { getArt } from '@/lib/data';

export default function ArtPage() {
    const artPieces = getArt();

    return (
        <div className="min-h-screen bg-[#0B0C14] text-white">
            <Navigation />

            <main className="pt-24 pb-20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6"><span className="bg-gradient-to-r from-white via-[#C9D3EE] to-[#6366F1] bg-clip-text text-transparent">Art Gallery</span></h1>
                        <p className="text-xl text-[#939DB8]">
                            Creative expressions and digital art
                        </p>
                    </div>

                    {/* Art Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {artPieces.map((art) => (
                            <div
                                key={art.id}
                                className="group relative overflow-hidden rounded-xl bg-[#171926] border border-[#727DA1]/15 hover:border-[#6366F1]/40 transition-all hover:shadow-2xl hover:shadow-[#6366F1]/10"
                            >
                                {/* Art Image */}
                                <div className="aspect-square bg-gradient-to-br from-[#6366F1]/20 via-[#818CF8]/15 to-[#4F46E5]/20 flex items-center justify-center relative overflow-hidden">
                                    <Image
                                        src={art.image}
                                        alt={art.title}
                                        fill
                                        className="object-cover"
                                        loading="lazy"
                                        quality={85}
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Art Info */}
                                <div className="p-6">
                                    <div className="text-sm text-[#939DB8] mb-2">{art.category}</div>
                                    <h3 className="text-xl font-bold mb-2 group-hover:text-[#6366F1] transition-colors">
                                        {art.title}
                                    </h3>
                                    <p className="text-[#939DB8] text-sm mb-3">{art.description}</p>
                                    <div className="text-xs text-[#939DB8]">{art.date}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
