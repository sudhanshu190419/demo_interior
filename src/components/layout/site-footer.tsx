"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";

export default function SiteFooter() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#080706] text-[#F4EFE6] border-t border-white/10 select-none">
      {/* Main Footer Content Grid */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 pt-16 sm:pt-20 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 sm:pb-16 border-b border-white/[0.08]">
          {/* Column 1: Brand & Socials (Span 4) */}
          <div className="lg:col-span-4 flex flex-col items-start gap-4">
            <div>
              <span className="block font-serif-luxury text-2xl sm:text-3xl tracking-[0.22em] text-[#F4EFE6] font-light leading-none">
                FORMA
              </span>
              <span className="block text-[9px] font-mono tracking-[0.35em] text-[#C6A77D] uppercase mt-1">
                INTERIORS
              </span>
            </div>

            <p className="text-xs sm:text-sm text-[#8C8272] font-light leading-relaxed max-w-xs mt-1">
              Thoughtful spaces. Designed for living.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4 mt-3 text-[#A89F91]">
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="p-1 rounded-full hover:text-[#C6A77D] hover:bg-white/5 transition-colors"
              >
                <svg
                  className="size-4 fill-none stroke-current"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>

              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Pinterest"
                className="p-1 rounded-full hover:text-[#C6A77D] hover:bg-white/5 transition-colors"
              >
                <svg
                  className="size-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="p-1 rounded-full hover:text-[#C6A77D] hover:bg-white/5 transition-colors"
              >
                <svg
                  className="size-4 fill-current"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links (Span 2) */}
          <div className="lg:col-span-2 flex flex-col gap-3.5">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C7355] uppercase font-semibold">
              NAVIGATION
            </span>
            <ul className="flex flex-col gap-2 text-xs sm:text-sm text-[#C5BCB0] font-light">
              <li>
                <a
                  href="#selected-work"
                  className="hover:text-[#C6A77D] transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#services"
                  className="hover:text-[#C6A77D] transition-colors"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  className="hover:text-[#C6A77D] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  className="hover:text-[#C6A77D] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Details (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C7355] uppercase font-semibold">
              CONTACT
            </span>
            <ul className="flex flex-col gap-3 text-xs sm:text-sm text-[#C5BCB0] font-light">
              <li>
                <a
                  href="mailto:hello@formainteriors.com"
                  className="inline-flex items-center gap-3 hover:text-[#C6A77D] transition-colors group"
                >
                  <Mail className="size-3.5 text-[#8C7355] shrink-0 group-hover:text-[#C6A77D]" />
                  <span>hello@formainteriors.com</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+919876543210"
                  className="inline-flex items-center gap-3 hover:text-[#C6A77D] transition-colors group"
                >
                  <Phone className="size-3.5 text-[#8C7355] shrink-0 group-hover:text-[#C6A77D]" />
                  <span>+91 98765 43210</span>
                </a>
              </li>
              <li className="inline-flex items-center gap-3 text-[#C5BCB0]">
                <MapPin className="size-3.5 text-[#8C7355] shrink-0" />
                <span>New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Form (Span 3) */}
          <div className="lg:col-span-3 flex flex-col gap-3.5">
            <span className="text-[10px] font-mono tracking-[0.25em] text-[#8C7355] uppercase font-semibold">
              NEWSLETTER
            </span>
            <p className="text-xs text-[#8C8272] font-light leading-relaxed">
              Inspiration, projects and ideas, straight to your inbox.
            </p>

            {subscribed ? (
              <div className="py-2.5 px-4 rounded-full bg-[#C6A77D]/10 border border-[#C6A77D]/30 text-xs text-[#C6A77D] font-light">
                Thank you for subscribing.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="relative mt-1">
                <input
                  type="email"
                  required
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-[#C6A77D] rounded-full py-2.5 pl-4 pr-11 text-xs text-[#F4EFE6] placeholder-[#6E665B] outline-none transition-colors"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/10 hover:bg-[#C6A77D] text-[#F4EFE6] hover:text-[#080706] flex items-center justify-center transition-all duration-300 group"
                >
                  <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Sub-Footer Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] sm:text-[11px] text-[#6B6358] font-light">
          <p>&copy; 2026 Forma Interiors. All rights reserved.</p>
          <div className="flex items-center gap-3 font-mono tracking-[0.25em] text-[9px] sm:text-[10px] uppercase text-[#736B5F]">
            <span>SPACES</span>
            <span>&bull;</span>
            <span>PEOPLE</span>
            <span>&bull;</span>
            <span>A BETTER EVERYDAY</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
