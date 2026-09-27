"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SelectedWorkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);
  const mobileStageRef = useRef<HTMLDivElement>(null);
  const mobileWatermarkRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  // Card element refs for desktop scroll assembly & subtle parallax
  const card1Ref = useRef<HTMLDivElement>(null); // 01 Living Room (Top-Left)
  const card5Ref = useRef<HTMLDivElement>(null); // 05 Bathroom (Bottom-Left)
  const cardMainRef = useRef<HTMLDivElement>(null); // 04 Courtyard House (Dominant Centerpiece)
  const card2Ref = useRef<HTMLDivElement>(null); // 02 Kitchen (Top-Right)
  const card3Ref = useRef<HTMLDivElement>(null); // 03 Bedroom (Mid-Right)
  const card6Ref = useRef<HTMLDivElement>(null); // 06 Dining (Bottom-Right)

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const stage = stageRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // 1. Header Reveal on Scroll Entry
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
          y: 35,
          opacity: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: "power2.out",
        });
      }

      // 2. Desktop Controlled Scroll Assembly & Subtle Parallax (min-width: 1024px)
      const mm = gsap.matchMedia();

      mm.add("(min-width: 1024px)", () => {
        if (!stage) return;

        // Pin the "INTERIORS" watermark fixed in the center of the viewport when reached
        if (watermarkRef.current) {
          ScrollTrigger.create({
            trigger: stage,
            start: "top center",
            end: "bottom center",
            pin: watermarkRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }

        // Master ScrollTrigger Timeline: Assembly into place + Restrained Parallax Float
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: stage,
            start: "top 85%",
            end: "bottom 15%",
            scrub: 1.2,
          },
        });

        // 04 MAIN (Central Visual Anchor - Stable & Commanding)
        if (cardMainRef.current) {
          tl.fromTo(
            cardMainRef.current,
            { y: 45, scale: 0.98 },
            { y: -18, scale: 1, ease: "power1.out" },
            0
          );
        }

        // 01 LIVING ROOM (Top-Left: slower vertical movement)
        if (card1Ref.current) {
          tl.fromTo(
            card1Ref.current,
            { y: 60, x: -20, scale: 0.96 },
            { y: -40, x: 8, scale: 1, ease: "power1.out" },
            0
          );
        }

        // 05 BATHROOM (Bottom-Left: subtle counter drift)
        if (card5Ref.current) {
          tl.fromTo(
            card5Ref.current,
            { y: 70, x: -16, scale: 0.96 },
            { y: -30, x: 8, scale: 1, ease: "power1.out" },
            0
          );
        }

        // 02 KITCHEN (Top-Right: higher elevation float)
        if (card2Ref.current) {
          tl.fromTo(
            card2Ref.current,
            { y: 65, x: 20, scale: 0.96 },
            { y: -50, x: -8, scale: 1, ease: "power1.out" },
            0
          );
        }

        // 03 BEDROOM (Mid-Right: distinct parallax rate)
        if (card3Ref.current) {
          tl.fromTo(
            card3Ref.current,
            { y: 75, x: 16, scale: 0.96 },
            { y: -45, x: -6, scale: 1, ease: "power1.out" },
            0
          );
        }

        // 06 DINING (Bottom-Right: small delayed motion)
        if (card6Ref.current) {
          tl.fromTo(
            card6Ref.current,
            { y: 80, scale: 0.95 },
            { y: -35, scale: 1, ease: "power1.out" },
            0.05
          );
        }

        // Understated CTA reveal
        if (ctaRef.current) {
          gsap.from(ctaRef.current, {
            scrollTrigger: {
              trigger: ctaRef.current,
              start: "top 92%",
              toggleActions: "play none none reverse",
            },
            y: 20,
            opacity: 0,
            duration: 0.8,
            ease: "power2.out",
          });
        }
      });

      // 3. Mobile Reveal Sequence (< 1024px)
      mm.add("(max-width: 1023px)", () => {
        if (mobileWatermarkRef.current && mobileStageRef.current) {
          ScrollTrigger.create({
            trigger: mobileStageRef.current,
            start: "top center",
            end: "bottom center",
            pin: mobileWatermarkRef.current,
            pinSpacing: false,
            invalidateOnRefresh: true,
          });
        }

        const mobileCards = [
          cardMainRef.current,
          card1Ref.current,
          card2Ref.current,
          card3Ref.current,
          card5Ref.current,
          card6Ref.current,
          ctaRef.current,
        ].filter(Boolean);

        mobileCards.forEach((card) => {
          gsap.from(card, {
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none reverse",
            },
            y: 25,
            opacity: 0,
            duration: 0.75,
            ease: "power2.out",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="selected-work"
      className="relative w-full bg-[#FAF7F2] text-[#1A1A1A] py-16 sm:py-20 lg:py-24 overflow-x-clip border-t border-[#EAE4D9]"
    >
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-12">
        {/* ==============================================================
            1. SECTION INTRO / HEADER (Calm, Editorial Breathing Room)
            ============================================================== */}
        <div
          ref={headerRef}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 pb-14 sm:pb-18 border-b border-[#E5DFD5]"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8C7355] font-semibold mb-3">
              <span className="w-5 h-[1px] bg-[#8C7355]" />
              <span>OUR SELECTED WORK</span>
            </div>
            <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-6xl font-light text-[#1A1A1A] tracking-tight leading-[1.08]">
              Spaces we&apos;ve shaped.
            </h2>
          </div>

          <div className="max-w-md">
            <p className="text-[#5A5248] text-sm sm:text-base font-light leading-relaxed">
              A selection of interiors designed around light, material, and everyday living.
            </p>
          </div>
        </div>

        {/* ==============================================================
            2. DESKTOP ASYMMETRICAL FLOATING COMPOSITION (min-width: 1024px)
            Exclusively 6 projects surrounding the dominant central anchor
            ============================================================== */}
        <div
          ref={stageRef}
          className="hidden lg:block relative w-full h-[980px] xl:h-[1030px] mt-8 mb-2 select-none"
        >
          {/* ==========================================================
              A. PINNED BACKGROUND "INTERIORS" WATERMARK
              Locks fixed in the exact center of viewport when user reaches this view,
              remains fixed in center while scrolling through the cards,
              and naturally unpins at the bottom of the stage.
              ========================================================== */}
          <div
            ref={watermarkRef}
            aria-hidden="true"
            className="absolute top-0 left-0 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0"
          >
            <span
              className="block font-serif-luxury text-[13vw] xl:text-[180px] font-light uppercase tracking-[0.24em] leading-none whitespace-nowrap select-none text-center"
              style={{
                WebkitTextStroke: "1.5px rgba(26, 26, 26, 0.22)",
                color: "transparent",
              }}
            >
              INTERIORS
            </span>
          </div>

          {/* ==========================================================
              B. LEFT FLANK: 01 LIVING ROOM & 05 BATHROOM
              ========================================================== */}

          {/* 01 LIVING ROOM (Top-Left) */}
          <div
            ref={card1Ref}
            className="group absolute top-[40px] left-[2%] w-[27%] max-w-[370px] z-10 flex flex-col"
          >
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-[#EAE4D9] rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] border border-[#E5DFD5]/90 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/living_room.png"
                alt="Modern Living Room with custom joinery and natural sunlight"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            {/* Metadata Below */}
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span className="font-medium">01</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5] group-hover:bg-[#8C7355] transition-colors" />
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase group-hover:text-[#8C7355] transition-colors">
                LIVING ROOM
              </span>
            </div>
          </div>

          {/* 05 BATHROOM SPACE (Bottom-Left) */}
          <div
            ref={card5Ref}
            className="group absolute top-[640px] xl:top-[680px] left-[2%] w-[27%] max-w-[370px] z-10 flex flex-col"
          >
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-[#EAE4D9] rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] border border-[#E5DFD5]/90 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/bathroom.png"
                alt="Minimalist luxury bathroom with natural stone basin"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            {/* Metadata Below */}
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span className="font-medium">05</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5] group-hover:bg-[#8C7355] transition-colors" />
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase group-hover:text-[#8C7355] transition-colors">
                BATHROOM
              </span>
            </div>
          </div>

          {/* ==========================================================
              C. CENTERPIECE: 04 COURTYARD HOUSE (FEATURED WORK)
              Dominant focal anchor with commanding scale & negative space
              ========================================================== */}
          <div
            ref={cardMainRef}
            className="group absolute top-[260px] xl:top-[280px] left-[31.5%] w-[38%] max-w-[570px] z-20 flex flex-col"
          >
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-[#EAE4D9] rounded-[2px] shadow-[0_25px_60px_rgba(0,0,0,0.08)] group-hover:shadow-[0_32px_75px_rgba(0,0,0,0.12)] border border-[#E5DFD5] transition-all duration-700">
              {/* Featured Badge */}
              <div className="absolute top-5 left-5 z-10 px-3.5 py-1.5 rounded-full bg-[#101010]/80 backdrop-blur-md border border-white/15 text-[10px] font-mono tracking-[0.25em] text-[#C6A77D] uppercase font-semibold">
                FEATURED WORK
              </div>

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/main.png"
                alt="Courtyard House — flagship luxury interior architecture"
                className="w-full h-full object-cover object-center transition-transform duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                loading="lazy"
              />
            </div>

            {/* Featured Metadata Bar */}
            <div className="mt-3.5 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-4 text-xs tracking-[0.25em] font-mono text-[#8C7355] font-semibold">
                <span>04</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5] group-hover:bg-[#8C7355] transition-colors" />
                <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </div>
              <div className="flex items-baseline justify-between gap-2 mt-0.5">
                <h3 className="font-serif-luxury text-lg xl:text-xl text-[#1A1A1A] font-light tracking-wide uppercase">
                  COURTYARD HOUSE
                </h3>
                <span className="text-[11px] text-[#7A6B58] uppercase tracking-wider font-light">
                  Full Interior Design
                </span>
              </div>
            </div>
          </div>

          {/* ==========================================================
              D. RIGHT FLANK: 02 KITCHEN, 03 BEDROOM, 06 DINING
              ========================================================== */}

          {/* 02 MODERN KITCHEN (Top-Right - Metadata on Top) */}
          <div
            ref={card2Ref}
            className="group absolute top-[30px] right-[2%] w-[27%] max-w-[370px] z-10 flex flex-col"
          >
            {/* Metadata Above Image */}
            <div className="mb-2.5 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span className="font-medium">02</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5] group-hover:bg-[#8C7355] transition-colors" />
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase group-hover:text-[#8C7355] transition-colors">
                KITCHEN
              </span>
            </div>

            <div className="relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D9] rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] border border-[#E5DFD5]/90 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/kitchen.png"
                alt="Bespoke culinary kitchen with marble island and warm timber cabinetry"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
          </div>

          {/* 03 BEDROOM (Mid-Right) */}
          <div
            ref={card3Ref}
            className="group absolute top-[370px] xl:top-[390px] right-[2%] w-[27%] max-w-[370px] z-10 flex flex-col"
          >
            <div className="relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D9] rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] border border-[#E5DFD5]/90 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/bedroom.png"
                alt="Master bedroom with bespoke headboard and soft ambient lighting"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            {/* Metadata Below */}
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span className="font-medium">03</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5] group-hover:bg-[#8C7355] transition-colors" />
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase group-hover:text-[#8C7355] transition-colors">
                BEDROOM
              </span>
            </div>
          </div>

          {/* 06 DINING (Bottom-Right) */}
          <div
            ref={card6Ref}
            className="group absolute top-[700px] xl:top-[740px] right-[2%] w-[27%] max-w-[370px] z-10 flex flex-col"
          >
            <div className="relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D9] rounded-[2px] shadow-[0_12px_32px_rgba(0,0,0,0.04)] group-hover:shadow-[0_20px_45px_rgba(0,0,0,0.08)] border border-[#E5DFD5]/90 transition-all duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/dining.png"
                alt="Contemporary dining area with warm timber table"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
                loading="lazy"
              />
            </div>
            {/* Metadata Below */}
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span className="font-medium">06</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5] group-hover:bg-[#8C7355] transition-colors" />
                <span className="text-xs transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  &#x2197;
                </span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase group-hover:text-[#8C7355] transition-colors">
                DINING
              </span>
            </div>
          </div>
        </div>

        {/* ==============================================================
            3. MOBILE / TABLET EDITORIAL SEQUENCE (< 1024px)
            Clean vertical progression with 04 MAIN first
            ============================================================== */}
        <div ref={mobileStageRef} className="flex lg:hidden relative flex-col gap-12 sm:gap-16 pt-8">
          {/* Pinned watermark on mobile */}
          <div
            ref={mobileWatermarkRef}
            aria-hidden="true"
            className="absolute top-0 left-0 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0"
          >
            <span
              className="block font-serif-luxury text-[16vw] sm:text-[14vw] font-light uppercase tracking-[0.2em] leading-none whitespace-nowrap select-none text-center"
              style={{
                WebkitTextStroke: "1.2px rgba(26, 26, 26, 0.18)",
                color: "transparent",
              }}
            >
              INTERIORS
            </span>
          </div>

          {/* 1. 04 MAIN (FEATURED PROJECT FIRST ON MOBILE) */}
          <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-[#EAE4D9] rounded-[2px] shadow-sm border border-[#E5DFD5]">
              <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-[#101010]/80 backdrop-blur-md border border-white/15 text-[9px] font-mono tracking-[0.25em] text-[#C6A77D] uppercase font-semibold">
                FEATURED WORK
              </div>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/main.png"
                alt="Courtyard House — flagship luxury interior architecture"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3.5 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355] font-semibold">
                <span>04</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5]" />
                <span className="text-xs">&#x2197;</span>
              </div>
              <div className="flex items-baseline justify-between gap-2 mt-0.5">
                <h3 className="font-serif-luxury text-lg text-[#1A1A1A] font-light tracking-wide uppercase">
                  COURTYARD HOUSE
                </h3>
                <span className="text-[11px] text-[#7A6B58] uppercase tracking-wider font-light">
                  Full Interior Design
                </span>
              </div>
            </div>
          </div>

          {/* 2. 01 LIVING ROOM */}
          <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-[#EAE4D9] rounded-[2px] border border-[#E5DFD5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/living_room.png"
                alt="Living room interior"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span>01</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5]" />
                <span className="text-xs">&#x2197;</span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase">
                LIVING ROOM
              </span>
            </div>
          </div>

          {/* 3. 02 KITCHEN */}
          <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D9] rounded-[2px] border border-[#E5DFD5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/kitchen.png"
                alt="Modern kitchen"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span>02</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5]" />
                <span className="text-xs">&#x2197;</span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase">
                KITCHEN
              </span>
            </div>
          </div>

          {/* 4. 03 BEDROOM */}
          <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D9] rounded-[2px] border border-[#E5DFD5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/bedroom.png"
                alt="Bedroom retreat"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span>03</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5]" />
                <span className="text-xs">&#x2197;</span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase">
                BEDROOM
              </span>
            </div>
          </div>

          {/* 5. 05 BATHROOM */}
          <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[4/3] bg-[#EAE4D9] rounded-[2px] border border-[#E5DFD5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/bathroom.png"
                alt="Bathroom space"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span>05</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5]" />
                <span className="text-xs">&#x2197;</span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase">
                BATHROOM
              </span>
            </div>
          </div>

          {/* 6. 06 DINING */}
          <div className="group flex flex-col">
            <div className="relative w-full overflow-hidden aspect-[16/10] bg-[#EAE4D9] rounded-[2px] border border-[#E5DFD5]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/work/dining.png"
                alt="Dining area"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
            </div>
            <div className="mt-3 flex flex-col gap-1 w-full">
              <div className="flex items-center justify-between gap-3 text-xs tracking-[0.2em] font-mono text-[#8C7355]">
                <span>06</span>
                <span className="flex-1 h-[1px] bg-[#E5DFD5]" />
                <span className="text-xs">&#x2197;</span>
              </div>
              <span className="font-sans font-light tracking-[0.22em] text-[11px] text-[#2A241E] uppercase">
                DINING
              </span>
            </div>
          </div>
        </div>

        {/* ==============================================================
            4. UNDERSTATED CTA
            ============================================================== */}
        <div ref={ctaRef} className="mt-6 sm:mt-8 lg:mt-10 text-center">
          <a
            href="#all-work"
            className="inline-flex items-center gap-3 text-xs sm:text-sm font-sans tracking-[0.25em] uppercase text-[#1A1A1A] hover:text-[#8C7355] transition-colors py-3.5 px-6 border-b border-[#1A1A1A]/20 hover:border-[#8C7355] group"
          >
            <span>View All Work</span>
            <span className="transition-transform duration-300 group-hover:translate-x-1 font-mono text-sm">
              &rarr;
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
