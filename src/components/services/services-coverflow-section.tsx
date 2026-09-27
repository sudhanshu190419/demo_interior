"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export interface ServiceSlide {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  src: string;
  alt: string;
  meta: { label: string; value: string }[];
}

const SERVICES_DATA: ServiceSlide[] = [
  {
    id: "spatial-planning",
    number: "01",
    title: "Spatial Architecture",
    subtitle: "Volume, Circulation & Sightlines",
    category: "Architecture & Flow",
    description:
      "Reimagining internal volumes to maximize natural illumination, seamless sightlines, and effortless everyday living.",
    src: "/interior/work/living_room.png",
    alt: "Modern Living Room Spatial Architecture",
    meta: [
      { label: "Scope", value: "Spatial Reconfiguration" },
      { label: "Focus", value: "Sunlight & Proportion" },
      { label: "Deliverable", value: "3D Spatial Layouts" },
    ],
  },
  {
    id: "bespoke-joinery",
    number: "02",
    title: "Bespoke Culinary & Joinery",
    subtitle: "Custom Timber & Stone Detailing",
    category: "Joinery & Materiality",
    description:
      "Millwork, monolithic natural stone islands, and integrated appliance architecture crafted specifically for your routine.",
    src: "/interior/work/kitchen.png",
    alt: "Bespoke Kitchen & Joinery Architecture",
    meta: [
      { label: "Scope", value: "Custom Cabinetry & Islands" },
      { label: "Focus", value: "Marble & Oak Joinery" },
      { label: "Deliverable", value: "Fabrication Drawings" },
    ],
  },
  {
    id: "private-sanctuary",
    number: "03",
    title: "Primary Suite Sanctuary",
    subtitle: "Acoustic Warmth & Restful Form",
    category: "Comfort & Atmosphere",
    description:
      "Serene private suites layered with tailored acoustic wall panelling, diffused lighting, and tactile natural textiles.",
    src: "/interior/work/bedroom.png",
    alt: "Primary Suite and Bedroom Sanctuary",
    meta: [
      { label: "Scope", value: "Primary Suite & Dressing" },
      { label: "Focus", value: "Acoustics & Ambient Light" },
      { label: "Deliverable", value: "Lighting & FF&E Schedule" },
    ],
  },
  {
    id: "turnkey-residence",
    number: "04",
    title: "Complete Residence Architecture",
    subtitle: "End-to-End Turnkey Vision",
    category: "Flagship Direction",
    description:
      "Full interior architectural transformation from initial conceptual layouts through artisan craftsmanship and site execution.",
    src: "/interior/work/main.png",
    alt: "Complete Luxury Residence Architecture",
    meta: [
      { label: "Scope", value: "Full Estate Execution" },
      { label: "Focus", value: "Holistic Atmosphere" },
      { label: "Deliverable", value: "Full Turnkey Delivery" },
    ],
  },
  {
    id: "wellness-bath",
    number: "05",
    title: "Wellness & Bath Environments",
    subtitle: "Monolithic Stone & Water Rituals",
    category: "Spa & Stone Architecture",
    description:
      "Sculptural wet rooms, custom floating stone vanities, and microcement finishes designed for daily restorative rituals.",
    src: "/interior/work/bathroom.png",
    alt: "Minimalist Stone Bathroom Architecture",
    meta: [
      { label: "Scope", value: "Master Bath & Powder Rooms" },
      { label: "Focus", value: "Natural Stone & Fittings" },
      { label: "Deliverable", value: "Sanitary & Wet Specs" },
    ],
  },
  {
    id: "curated-dining",
    number: "06",
    title: "Social Spaces & Dining",
    subtitle: "Sculptural Lighting & Statement Living",
    category: "Curated Living",
    description:
      "Atmospheric gathering spaces anchored by bespoke dining tables, sculptural lighting pendants, and curated collectible furnishings.",
    src: "/interior/work/dining.png",
    alt: "Curated Dining and Entertaining Space",
    meta: [
      { label: "Scope", value: "Dining & Entertaining" },
      { label: "Focus", value: "Collectible Design" },
      { label: "Deliverable", value: "Custom Furniture Production" },
    ],
  },
];

export default function ServicesCoverflowSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const widthRef = useRef<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  const count = SERVICES_DATA.length;
  const rotate = 38;
  const depth = 0.55;
  const perspective = 3.2;
  const falloff = 0.62;
  const fade = 0.18;
  const gap = 0.12;

  // Render 3D Coverflow position straight to DOM nodes for 60fps / 120fps fluid response
  const applyCoverflow = useCallback(
    (pos: number) => {
      const width = widthRef.current || 320;
      const pitch = width * (1 + gap);

      cardRefs.current.forEach((card, index) => {
        if (!card) return;

        const offset = index - pos; // continuous fractional distance
        const distance = Math.abs(offset);
        const ramp = Math.pow(distance, falloff);
        const tilt = Math.min(rotate * ramp, 76) * Math.sign(offset);

        card.style.transform = `translateX(calc(-50% + ${
          offset * pitch
        }px)) translateZ(${-depth * width * ramp}px) rotateY(${-tilt}deg)`;

        // Opacity drops with distance, center card is always 100% solid
        const opacity = Math.max(0.18, 1 - fade * distance);
        card.style.opacity = String(opacity);
        card.style.zIndex = String(100 - Math.round(distance * 10));

        // Highlight center active card border subtly
        if (distance < 0.4) {
          card.style.borderColor = "rgba(198, 167, 125, 0.6)";
        } else {
          card.style.borderColor = "rgba(255, 255, 255, 0.1)";
        }
      });

      const nearestIndex = Math.max(0, Math.min(count - 1, Math.round(pos)));
      setActiveIndex(nearestIndex);
    },
    [count, depth, fade, falloff, gap, rotate]
  );

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section || !stage) return;

    // Measure card base width
    const measure = () => {
      const firstCard = cardRefs.current[0];
      if (firstCard) {
        widthRef.current = firstCard.offsetWidth;
      }
    };
    measure();
    window.addEventListener("resize", measure);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // DESKTOP: Full Scroll-Controlled Coverflow (>= 1024px)
      mm.add("(min-width: 1024px)", () => {
        // Master Pin ScrollTrigger: Pins section for 2.8x viewport height
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=260%",
          pin: true,
          pinSpacing: true,
          scrub: 0.8,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            // Continuous fractional position from 0 to (count - 1)
            const targetPos = self.progress * (count - 1);
            applyCoverflow(targetPos);
          },
        });
      });

      // MOBILE / TABLET (< 1024px): Responsive scroll-driven progression
      mm.add("(max-width: 1023px)", () => {
        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: "+=200%",
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const targetPos = self.progress * (count - 1);
            applyCoverflow(targetPos);
          },
        });
      });
    }, sectionRef);

    // Initial paint at slide 0
    applyCoverflow(0);

    return () => {
      window.removeEventListener("resize", measure);
      ctx.revert();
    };
  }, [applyCoverflow, count]);

  const activeService = SERVICES_DATA[activeIndex] || SERVICES_DATA[0];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative w-full min-h-screen bg-[#14110D] text-[#F4EFE6] flex flex-col justify-between pt-16 sm:pt-18 lg:pt-20 pb-8 sm:pb-10 overflow-hidden border-t border-[#332A20]/40 select-none"
    >
      {/* ==============================================================
          ATMOSPHERIC WARM ESPRESSO GALLERY BACKGROUND
          Exact warm espresso tone with seamless, uniform ambient lighting
          ============================================================== */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {/* Base rich warm umber background */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#100E0B] via-[#16130F] to-[#0E0C09]" />

        {/* Unified seamless warm ambient glow covering stage and ground */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_75%_at_50%_55%,rgba(198,155,105,0.14)_0%,rgba(140,105,68,0.05)_50%,transparent_80%)]" />

        {/* Cinema edge vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_95%_95%_at_50%_50%,transparent_60%,rgba(8,7,5,0.75)_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-12 flex flex-col h-full justify-between gap-3 sm:gap-4">
        {/* ==============================================================
            1. SECTION HEADER
            ============================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-4 border-b border-white/10">
          <div>
            <div className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#C6A77D] font-semibold mb-1.5">
              <span className="w-5 h-[1px] bg-[#C6A77D]" />
              <span>03 &bull; SERVICES & DISCIPLINES</span>
            </div>
            <h2 className="font-serif-luxury text-3xl sm:text-4xl lg:text-5xl font-light text-[#F4EFE6] tracking-tight">
              Crafted to Endure.
            </h2>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono tracking-widest text-[#8C8272]">
            <span>SCROLL TO EXPLORE</span>
            <span className="text-[#C6A77D] font-semibold">
              {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* ==============================================================
            2. COVERFLOW 3D STAGE (Continuous Scroll-Driven Movement)
            ============================================================== */}
        <div
          ref={containerRef}
          className="relative w-full flex items-center justify-center my-0 py-0"
          style={{ ["--cf-card" as string]: "clamp(240px, 32vw, 420px)" }}
        >
          <div
            ref={stageRef}
            className="w-full relative overflow-visible"
            style={{
              perspective: `calc(var(--cf-card) * ${perspective})`,
              touchAction: "pan-y",
            }}
          >
            <div
              className="relative select-none mx-auto"
              style={{
                height: "calc(var(--cf-card) * 0.77)",
                transformStyle: "preserve-3d",
              }}
            >
              {SERVICES_DATA.map((service, index) => (
                <div
                  key={service.id}
                  ref={(node) => {
                    cardRefs.current[index] = node;
                  }}
                  className={cn(
                    "absolute left-1/2 top-0 aspect-[4/3] rounded-lg overflow-hidden bg-[#161616] border border-white/10 shadow-[0_15px_35px_rgba(0,0,0,0.35)] will-change-transform transition-[border-color] duration-300"
                  )}
                  style={{ width: "var(--cf-card)" }}
                >
                  {/* Number Badge */}
                  <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-[0.2em] text-[#C6A77D] uppercase font-semibold">
                    {service.number}
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 right-4 z-10 px-3 py-1 rounded-full bg-[#0D0D0D]/80 backdrop-blur-md border border-white/10 text-[9px] font-mono tracking-wider text-[#A89F91] uppercase">
                    {service.category}
                  </div>

                  {/* Service Image */}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={service.src}
                    alt={service.alt}
                    draggable={false}
                    className="h-full w-full select-none object-cover object-center"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ==============================================================
            3. DYNAMIC ACTIVE SERVICE METADATA & SPECS (Centered Editorial)
            ============================================================== */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto -mt-1 sm:-mt-2 pt-0 pb-0 z-10">
          {/* Number with dash */}
          <div className="inline-flex items-center gap-3 text-xs font-mono text-[#C6A77D] tracking-[0.25em] mb-1">
            <span>{activeService.number}</span>
            <span className="w-8 h-[1px] bg-[#C6A77D]/70" />
          </div>

          {/* Active Title */}
          <h3 className="font-serif-luxury text-2xl sm:text-3xl lg:text-[34px] text-[#F4EFE6] font-light tracking-tight">
            {activeService.title}
          </h3>

          {/* Active Description */}
          <p className="text-sm sm:text-base text-[#9E9485] font-light leading-relaxed max-w-lg mt-1.5">
            {activeService.description}
          </p>

          {/* Explore Service Pill Button */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-7 py-2.5 rounded-full border border-white/20 bg-white/[0.04] hover:bg-white/[0.08] hover:border-[#C6A77D]/70 text-[11px] font-mono tracking-[0.25em] uppercase text-[#F4EFE6] hover:text-[#C6A77D] transition-all duration-300 mt-4 group"
          >
            <span>EXPLORE SERVICE</span>
            <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 font-mono">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
