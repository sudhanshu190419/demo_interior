"use client";

import { useState } from "react";

interface SiteNavProps {
  className?: string;
}

export default function SiteNav({ className = "" }: SiteNavProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      id="main-navigation"
      className={`fixed top-0 left-0 right-0 w-full z-[100] pointer-events-auto transition-all duration-500 bg-gradient-to-b from-black/60 via-black/20 to-transparent box-border ${className}`}
    >
      <div className="w-full max-w-[1780px] mx-auto px-6 sm:px-8 md:px-12 lg:px-16 py-6 md:py-8 flex items-center justify-between">
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex flex-col items-start text-[#f4efe6] transition-opacity hover:opacity-85 select-none"
          id="nav-logo"
        >
          <span className="font-serif-luxury text-2xl md:text-[27px] tracking-[0.14em] font-light uppercase leading-none text-[#f4efe6] drop-shadow-sm">
            FORMA
          </span>
          <span className="text-[8px] md:text-[8.5px] tracking-[0.4em] text-[#f4efe6]/80 uppercase font-light mt-1 drop-shadow-sm">
            INTERIORS
          </span>
        </a>

        {/* Desktop Navigation Links (visible on md screens 768px and up) */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-9 xl:gap-11 text-[13.5px] md:text-[14px] font-light tracking-wide text-[#f4efe6] drop-shadow-sm">
          <a
            href="#projects"
            className="transition-colors hover:text-white"
            id="nav-link-projects"
          >
            Projects
          </a>
          <a
            href="#studio"
            className="transition-colors hover:text-white"
            id="nav-link-studio"
          >
            Studio
          </a>
          <a
            href="#services"
            className="transition-colors hover:text-white"
            id="nav-link-services"
          >
            Services
          </a>
          <a
            href="#about"
            className="transition-colors hover:text-white"
            id="nav-link-about"
          >
            About
          </a>
          <a
            href="#contact"
            className="transition-colors hover:text-white"
            id="nav-link-contact"
          >
            Contact
          </a>
        </nav>

        {/* Desktop CTA Button: Thin Pill Outline */}
        <div className="hidden md:flex items-center">
          <a
            href="#contact"
            id="nav-cta-button"
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-full border border-white/40 hover:border-white text-[13.5px] md:text-[14px] font-light text-[#f4efe6] hover:text-white transition-all duration-300 hover:bg-white/15 drop-shadow-sm"
          >
            <span>Get in Touch</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 text-white focus:outline-none"
          aria-label="Toggle Navigation Menu"
          id="nav-mobile-toggle"
        >
          <span
            className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${
              mobileMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-current transition-opacity duration-300 ${
              mobileMenuOpen ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`block w-6 h-[1.5px] bg-current transition-transform duration-300 ${
              mobileMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      <div
        className={`md:hidden fixed inset-0 top-[76px] bg-[#0d0d0d]/95 backdrop-blur-xl transition-all duration-500 flex flex-col p-8 gap-6 ${
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col gap-6 text-xl tracking-wider uppercase text-[#e8e2d9] pt-4">
          <a
            href="#projects"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/10"
          >
            Projects
          </a>
          <a
            href="#studio"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/10"
          >
            Studio
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/10"
          >
            Services
          </a>
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/10"
          >
            About
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="py-2 border-b border-white/10"
          >
            Contact
          </a>
        </div>
        <div className="mt-8">
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex w-full justify-center items-center gap-3 py-3.5 rounded-full border border-white/40 text-white font-light"
          >
            Get in Touch &rarr;
          </a>
        </div>
      </div>
    </header>
  );
}
