import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { PageBackground } from '@/components/layout/PageBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { CurrentFocusSection } from '@/components/sections/CurrentFocusSection';

import { ArtGallerySection } from '@/components/sections/ArtGallerySection';
import { BlogSection } from '@/components/sections/BlogSection';
import { getPersonalInfo, getBlogs, getArt, getSiteContent } from '@/lib/data';

export const dynamic = 'force-dynamic';

export default function Home() {
  const personal = getPersonalInfo();
  const site = getSiteContent();
  const blogs = getBlogs().slice(0, 5);
  const artPieces = getArt().slice(0, 3);

  return (
    <PageBackground>
      <Navigation />
      <HeroSection personal={personal} content={site.home.hero} />

      {/* Hero to Content Gradient Transition */}
      <div className="absolute top-[100vh] left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[#0B0C14] -mt-32 z-20 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-[#0B0C14]">
        <CurrentFocusSection content={site.home.currentFocus} />
        <ArtGallerySection artPieces={artPieces} content={site.home.artSection} />
        <BlogSection blogs={blogs} content={site.home.blogSection} labels={site.labels} />
      </div>

      <Footer />
    </PageBackground>
  );
}
