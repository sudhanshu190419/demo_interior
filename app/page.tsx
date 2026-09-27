import SmoothScrollProvider from "@/src/components/providers/smooth-scroll";
import SiteNav from "@/src/components/layout/site-nav";
import HeroCinematic from "@/src/components/hero/hero-cinematic";
import SelectedWorkSection from "@/src/components/work/selected-work-section";
import ServicesCoverflowSection from "@/src/components/services/services-coverflow-section";
import CtaEditorialSection from "@/src/components/cta/cta-editorial-section";
import SiteFooter from "@/src/components/layout/site-footer";

export default function Home() {
  return (
    <SmoothScrollProvider>
      <main className="relative w-full min-h-screen bg-[#0d0d0d] text-[#f4efe6]">
        {/* Navigation Bar: Fixed to the actual browser viewport, floating over Hero */}
        <SiteNav />

        {/* Section 01: Pinned Hero Cinematic */}
        <HeroCinematic />

        {/* Section 02: Selected Work / Projects */}
        <SelectedWorkSection />

        {/* Section 03: Scroll-Controlled Coverflow Services */}
        <ServicesCoverflowSection />

        {/* Section 04: Editorial CTA Callout */}
        <CtaEditorialSection />

        {/* Section 05: Editorial Studio Footer */}
        <SiteFooter />
      </main>
    </SmoothScrollProvider>
  );
}
