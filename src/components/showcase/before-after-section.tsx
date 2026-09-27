"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface TransformationProps {
  id: string;
  subtitle: string;
  title: string;
  description: string;
  beforeSrc: string;
  afterSrc: string;
  meta: {
    location: string;
    scope: string;
    materials: string;
    timeline: string;
  };
}

function TransformationShowcase({
  id,
  subtitle,
  title,
  description,
  beforeSrc,
  afterSrc,
  meta,
}: TransformationProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPosition, setSliderPosition] = useState<number>(50); // percentage (0 - 100)
  const isDraggingRef = useRef<boolean>(false);

  // Update slider position with bounds clamping
  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  }, []);

  const handlePointerDown = () => {
    isDraggingRef.current = true;
  };

  useEffect(() => {
    const handlePointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      updatePosition(e.clientX);
    };

    const handlePointerUp = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
    };
  }, [updatePosition]);

  // Scroll-driven divider sweep animation on entry
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: container,
        start: "top 75%",
        end: "bottom 25%",
        scrub: 0.4,
        onUpdate: (self) => {
          if (!isDraggingRef.current) {
            // Smoothly move divider based on scroll progress from 20% to 75%
            const newPos = 20 + self.progress * 55;
            setSliderPosition(newPos);
          }
        },
      });
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <article
      id={id}
      className="w-full max-w-[1500px] mx-auto px-6 md:px-12 py-20 lg:py-28"
    >
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/10 pb-8">
        <div className="max-w-xl">
          <span className="text-xs md:text-sm tracking-[0.35em] uppercase text-[#c6a77d] font-medium block mb-3">
            {subtitle}
          </span>
          <h2 className="font-serif-luxury text-3xl sm:text-5xl lg:text-6xl text-[#f4efe6] font-light tracking-tight">
            {title}
          </h2>
        </div>
        <p className="text-sm md:text-base text-[#a8a196] max-w-md font-light leading-relaxed">
          {description}
        </p>
      </div>

      {/* Interactive Before/After Split Viewer */}
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden shadow-2xl select-none border border-white/10 bg-[#141414] cursor-ew-resize"
        onPointerDown={handlePointerDown}
      >
        {/* Layer 1: BEFORE Image */}
        <div className="absolute inset-0 w-full h-full">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={beforeSrc}
            alt="Before space"
            className="w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          {/* Label Badge: Before */}
          <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-medium tracking-[0.2em] text-[#d6cec2] uppercase z-20">
            Before — Raw Shell
          </div>
        </div>

        {/* Layer 2: AFTER Image (Clipped dynamically by slider position) */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)`,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={afterSrc}
            alt="After space"
            className="w-full h-full object-cover object-center pointer-events-none"
            draggable={false}
          />
          {/* Label Badge: After */}
          <div className="absolute top-6 left-6 px-4 py-1.5 rounded-full bg-[#1e2e21]/80 backdrop-blur-md border border-[#c6a77d]/40 text-[11px] font-medium tracking-[0.2em] text-[#f4efe6] uppercase z-20">
            After — Curated Living
          </div>
        </div>

        {/* Slider Divider Line & Draggable Handle */}
        <div
          className="absolute top-0 bottom-0 z-30 pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Vertical Glowing Divider Line */}
          <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-white via-[#c6a77d] to-white shadow-[0_0_12px_rgba(198,167,125,0.8)]" />

          {/* Draggable Circle Handle */}
          <div className="absolute top-1/2 -left-6 -translate-y-1/2 w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border border-black/10 flex items-center justify-center pointer-events-auto cursor-grab active:cursor-grabbing hover:scale-110 transition-transform">
            <svg
              className="w-5 h-5 text-[#1a1a1a]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
              <polyline points="9 18 3 12 9 6" />
            </svg>
            <svg
              className="w-5 h-5 text-[#1a1a1a] -ml-2"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="9 18 15 12 9 6" />
              <polyline points="15 18 21 12 15 6" />
            </svg>
          </div>
        </div>

        {/* Drag Hint */}
        <div className="absolute bottom-6 right-6 px-3.5 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] tracking-[0.2em] text-[#d6cec2]/80 uppercase pointer-events-none z-20">
          Drag Handle &bull; Compare Space
        </div>
      </div>

      {/* Project Meta Specifications Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-10 pt-8 border-t border-white/10">
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c8272] block mb-1">
            Location
          </span>
          <p className="text-sm font-medium text-[#f4efe6]">{meta.location}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c8272] block mb-1">
            Project Scope
          </span>
          <p className="text-sm font-medium text-[#f4efe6]">{meta.scope}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c8272] block mb-1">
            Materiality
          </span>
          <p className="text-sm font-medium text-[#f4efe6]">{meta.materials}</p>
        </div>
        <div>
          <span className="text-[10px] uppercase tracking-[0.25em] text-[#8c8272] block mb-1">
            Execution
          </span>
          <p className="text-sm font-medium text-[#f4efe6]">{meta.timeline}</p>
        </div>
      </div>
    </article>
  );
}

export default function BeforeAfterSection() {
  return (
    <section
      id="transformations"
      className="relative w-full bg-[#0d0d0d] py-24 text-[#f4efe6] overflow-hidden"
    >
      {/* Section Header */}
      <div className="max-w-[1500px] mx-auto px-6 md:px-12 text-center mb-16">
        <span className="text-xs tracking-[0.4em] uppercase text-[#c6a77d] font-medium block mb-4">
          ARCHITECTURAL TRANSFORMATIONS
        </span>
        <h2 className="font-serif-luxury text-4xl sm:text-6xl md:text-7xl font-light text-[#f8f5ee] tracking-tight">
          From Raw Structure to Sanctuary.
        </h2>
        <p className="text-sm md:text-base text-[#a8a196] max-w-2xl mx-auto mt-6 font-light leading-relaxed">
          Explore how thoughtful proportions, ambient lighting, and bespoke materiality
          breathe enduring life into every space we touch.
        </p>
      </div>

      {/* 1. Living Room Transformation */}
      <TransformationShowcase
        id="project-living-room"
        subtitle="PROJECT 01 &bull; THE SOLARIUM RESIDENCE"
        title="Living Room Transformation"
        description="A bare concrete shell reimagined into a luminous living pavilion with continuous flush warm wood flooring, fluted stone accents, and tailored bouclé seating."
        beforeSrc="/interior/before-after/slices/living-room-before.png"
        afterSrc="/interior/before-after/slices/living-room-after.png"
        meta={{
          location: "Kensington, London",
          scope: "Full Interior Architecture & Joinery",
          materials: "Smoked Oak, Bouclé, Travertine",
          timeline: "6 Months",
        }}
      />

      {/* 2. Kitchen Transformation */}
      <TransformationShowcase
        id="project-kitchen"
        subtitle="PROJECT 02 &bull; THE HIGHGATE VILLA"
        title="Culinary Suite Transformation"
        description="A dated utilitarian kitchen transformed into an organic minimalist entertaining center with monolithic Calacatta quartz island and bespoke brass fixtures."
        beforeSrc="/interior/before-after/slices/kitchen-before.png"
        afterSrc="/interior/before-after/slices/kitchen-after.png"
        meta={{
          location: "Chelsea Waterfront",
          scope: "Kitchen Expansion & Architectural Lighting",
          materials: "Honed Marble, Smoked Oak, Brushed Brass",
          timeline: "4 Months",
        }}
      />
    </section>
  );
}
