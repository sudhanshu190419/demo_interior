"use client";

import React, { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function CtaEditorialSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bgImageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const content = contentRef.current;
    const bgImage = bgImageRef.current;
    if (!section || !content) return;

    const ctx = gsap.context(() => {
      // 1. Smooth content reveal when entering viewport
      gsap.from(content.children, {
        scrollTrigger: {
          trigger: content,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
        y: 40,
        opacity: 0,
        duration: 0.9,
        stagger: 0.12,
        ease: "power2.out",
      });

      // 2. Subtle background parallax movement
      if (bgImage) {
        gsap.fromTo(
          bgImage,
          { y: "-4%" },
          {
            y: "4%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-[680px] lg:min-h-[760px] xl:min-h-[820px] overflow-hidden flex items-center select-none"
    >
      {/* Full-bleed Background Image with subtle parallax */}
      <div
        ref={bgImageRef}
        className="absolute inset-[-6%] w-[112%] h-[112%] pointer-events-none z-0"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/interior/cta.png"
          alt="Sunlit architectural luxury interior villa with courtyard garden"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
        {/* Soft atmospheric overlay for high-contrast typography readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2]/60 via-[#FAF7F2]/20 to-transparent pointer-events-none lg:w-3/5" />
      </div>

      {/* Foreground Content Container */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-6 sm:px-10 lg:px-16 py-16 sm:py-24 lg:py-28">
        <div
          ref={contentRef}
          className="max-w-xl flex flex-col items-start text-left"
        >
          {/* Top Label */}
          <div className="inline-flex items-center gap-3 text-[11px] sm:text-xs font-mono tracking-[0.3em] uppercase text-[#8C7355] font-semibold mb-4 sm:mb-6">
            <span className="w-8 h-[1px] bg-[#8C7355]" />
            <span>LET&apos;S CREATE</span>
          </div>

          {/* Main Editorial Headline */}
          <h2 className="font-serif-luxury text-4xl sm:text-5xl lg:text-[62px] text-[#1A1A1A] font-normal leading-[1.08] tracking-tight">
            A better space starts with{" "}
            <span className="text-[#A38258] italic font-light">a better idea.</span>
          </h2>

          {/* Subtitle / Paragraph */}
          <p className="text-sm sm:text-base text-[#5A5248] font-light leading-relaxed max-w-md mt-4 sm:mt-6">
            Tell us what you&apos;re imagining. We&apos;ll help shape it into a
            space that feels distinctly yours.
          </p>

          {/* Dual Pill Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 mt-7 sm:mt-9">
            {/* Primary Action Button */}
            <a
              href="#contact-form"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-[#141210] hover:bg-[#2A241E] text-[#F4EFE6] text-xs sm:text-sm font-sans tracking-wider shadow-[0_8px_20px_rgba(20,18,16,0.18)] hover:shadow-[0_12px_28px_rgba(20,18,16,0.25)] transition-all duration-300 group"
            >
              <span>Start a Project</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 font-mono">
                &rarr;
              </span>
            </a>

            {/* Secondary Action Button */}
            <a
              href="#selected-work"
              className="inline-flex items-center gap-2.5 px-7 py-3 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-md border border-[#141210]/20 hover:border-[#141210]/50 text-[#141210] text-xs sm:text-sm font-sans tracking-wider shadow-sm transition-all duration-300 group"
            >
              <span>View Our Work</span>
              <span className="text-xs transition-transform duration-300 group-hover:translate-x-1 font-mono">
                &rarr;
              </span>
            </a>
          </div>

          {/* Bottom Category Tags */}
          <div className="flex items-center gap-3 text-[10px] sm:text-[11px] font-mono tracking-[0.28em] text-[#8C7355] uppercase mt-8 sm:mt-12 lg:mt-14 font-medium">
            <span>INTERIORS</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]/40" />
            <span>RENOVATION</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#8C7355]/40" />
            <span>COMPLETE HOMES</span>
          </div>
        </div>
      </div>
    </section>
  );
}
