import { PageBackground } from '@/components/layout/PageBackground';
import { HeroSection } from '@/components/sections/HeroSection';
import { CurrentFocusSection } from '@/components/sections/CurrentFocusSection';

import { ArtGallerySection } from '@/components/sections/ArtGallerySection';
import { BlogSection } from '@/components/sections/BlogSection';
import { getPersonalInfo, getBlogs, getArt, getSiteContent } from '@/lib/data';

export default function Home() {
  const personal = getPersonalInfo();
  const site = getSiteContent();
  const blogs = getBlogs().slice(0, 5);
  const artPieces = getArt().slice(0, 3);

  return (
    <PageBackground>
      <HeroSection personal={personal} content={site.home.hero} />

      {/* Hero to Content Gradient Transition */}
      <div className="absolute top-[100vh] left-0 right-0 h-32 bg-gradient-to-b from-transparent to-(color:--s-bg) -mt-32 z-20 pointer-events-none"></div>

      {/* Main Content Area */}
      <div className="relative z-20 bg-(--s-bg)">
        <CurrentFocusSection content={site.home.currentFocus} />
        <ArtGallerySection artPieces={artPieces} content={site.home.artSection} etsyHref={personal.social.etsy} />
        <BlogSection blogs={blogs} content={site.home.blogSection} labels={site.labels} />
      </div>

    </PageBackground>
  );
}
