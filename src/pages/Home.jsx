import Header from '../components/Header';
import HeroSection from '../components/HeroSection';
import CoupleSection from '../components/CoupleSection';
import TimelineSection from '../components/TimelineSection';
import GallerySection from '../components/GallerySection';
import LocationSection from '../components/LocationSection';
import RSVPSection from '../components/RSVPSection';
import WishesSection from '../components/WishesSection';
import Footer from '../components/Footer';
import BackToTop from '../components/BackToTop';

export default function Home() {
  // Scroll to section functionality
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 80; // Adjust based on header height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='flex flex-col min-h-screen'>
      <Header scrollToSection={scrollToSection} />
      <main>
        <HeroSection scrollToSection={scrollToSection} />
        <CoupleSection />
        <TimelineSection />
        <GallerySection />
        <LocationSection />
        <RSVPSection />
        <WishesSection />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}
