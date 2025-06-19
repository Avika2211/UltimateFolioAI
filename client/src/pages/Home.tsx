import { useEffect } from "react";
import ParticleSystem from "@/components/ui/particle-system";
import FloatingNavigation from "@/components/ui/floating-navigation";
import HeroSection from "@/components/ui/hero-section";
import AboutSection from "@/components/ui/about-section";
import WorkSection from "@/components/ui/work-section";
import ContactSection from "@/components/ui/contact-section";
import ScrollProgress from "@/components/ui/scroll-progress";
import AIChatbot from "@/components/ui/ai-chatbot";

export default function Home() {
  useEffect(() => {
    // Set page title
    document.title = "Avika Joshi - AI/ML Research Engineer | MIT CSAIL Fellow";
    
    // Add scroll behavior
    const smoothScroll = (e: Event) => {
      const target = e.target as HTMLAnchorElement;
      if (target.href && target.href.includes('#')) {
        e.preventDefault();
        const id = target.href.split('#')[1];
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    };

    document.addEventListener('click', smoothScroll);
    return () => document.removeEventListener('click', smoothScroll);
  }, []);

  return (
    <div className="bg-deep-space text-white overflow-x-hidden">
      <ScrollProgress />
      <ParticleSystem />
      <FloatingNavigation />
      
      <main>
        <HeroSection />
        <AboutSection />
        <WorkSection />
        <ContactSection />
      </main>
      
      <AIChatbot />
      
      <footer className="py-8 border-t border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2024 Avika Joshi. Designed with cutting-edge technology.
          </p>
        </div>
      </footer>
    </div>
  );
}
