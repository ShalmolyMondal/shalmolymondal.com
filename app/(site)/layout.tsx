import Footer from '@/components/Footer';
import Navigation from '@/components/Navigation';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navigation />
      {children}
      <Footer />
    </>
  );
}
