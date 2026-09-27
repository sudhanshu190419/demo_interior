"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCinematic() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const roomBgRef = useRef<HTMLDivElement>(null);
  const tvScreenRef = useRef<HTMLDivElement>(null);
  const tvAfterLayerRef = useRef<HTMLDivElement>(null);
  const tvAfterBadgeRef = useRef<HTMLDivElement>(null);
  const tvBeforeClipWrapperRef = useRef<HTMLDivElement>(null);
  const tvBeforeBadgeRef = useRef<HTMLDivElement>(null);
  const tvKitchenAfterLayerRef = useRef<HTMLDivElement>(null);
  const tvKitchenAfterBadgeRef = useRef<HTMLDivElement>(null);
  const tvKitchenBeforeClipWrapperRef = useRef<HTMLDivElement>(null);
  const tvKitchenBeforeBadgeRef = useRef<HTMLDivElement>(null);
  const hudBeforeLayerRef = useRef<HTMLDivElement>(null);
  const hudAfterLayerRef = useRef<HTMLDivElement>(null);
  const tvSliderDividerRef = useRef<HTMLDivElement>(null);
  const tvGlareRef = useRef<HTMLDivElement>(null);
  const openingTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinSection = pinSectionRef.current;
    const cameraRig = cameraRigRef.current;
    const roomBg = roomBgRef.current;
    const tvScreen = tvScreenRef.current;
    const tvAfterLayer = tvAfterLayerRef.current;
    const tvAfterBadge = tvAfterBadgeRef.current;
    const tvBeforeClipWrapper = tvBeforeClipWrapperRef.current;
    const tvBeforeBadge = tvBeforeBadgeRef.current;
    const tvKitchenAfterLayer = tvKitchenAfterLayerRef.current;
    const tvKitchenAfterBadge = tvKitchenAfterBadgeRef.current;
    const tvKitchenBeforeClipWrapper = tvKitchenBeforeClipWrapperRef.current;
    const tvKitchenBeforeBadge = tvKitchenBeforeBadgeRef.current;
    const hudBeforeLayer = hudBeforeLayerRef.current;
    const hudAfterLayer = hudAfterLayerRef.current;
    const tvSliderDivider = tvSliderDividerRef.current;
    const tvGlare = tvGlareRef.current;
    const openingText = openingTextRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!pinSection || !cameraRig || !tvScreen) return;

    const ctx = gsap.context(() => {
      /* ==============================================================
         1. MATHEMATICAL VIEWPORT CENTERING CALCULATION
         ============================================================== */
      const getCenteringParams = () => {
        // Reset scale and translation to measure baseline unscaled coordinates
        gsap.set(cameraRig, { scale: 1, x: 0, y: 0 });
        const screenRect = tvScreen.getBoundingClientRect();

        const tvCenterX = screenRect.left + screenRect.width / 2;
        const tvCenterY = screenRect.top + screenRect.height / 2;

        const curWidth = window.visualViewport?.width || window.innerWidth;
        const curHeight = window.visualViewport?.height || window.innerHeight;

        const vpCenterX = curWidth / 2;
        const vpCenterY = curHeight / 2;

        // Offset from viewport center at scale 1
        const ox = tvCenterX - vpCenterX;
        const oy = tvCenterY - vpCenterY;

        // Target scale to completely fill viewport edges
        const scaleX = curWidth / screenRect.width;
        const scaleY = curHeight / screenRect.height;
        // On portrait / phone screens, use 1.65 margin to guarantee 100% full-bleed coverage across ultra-tall aspect ratios and mobile browser bars; on desktop keep 1.05
        const isPortrait = curHeight > curWidth;
        const targetScale = Math.max(scaleX, scaleY) * (isPortrait ? 1.65 : 1.05);

        // Required translation at targetScale with transform-origin: 50% 50%
        const targetX = -ox * targetScale;
        const targetY = -oy * targetScale;

        return { targetScale, targetX, targetY };
      };

      let { targetScale, targetX, targetY } = getCenteringParams();

      // Mobile VisualViewport synchronization: keep pinned stage & centering dynamically sized as mobile address bar collapses/expands
      const handleVisualViewportResize = () => {
        if (!window.visualViewport) return;
        const vh = window.visualViewport.height;

        if (pinSection) {
          pinSection.style.height = `${vh}px`;
          const pinSpacer = pinSection.parentElement?.classList.contains("pin-spacer")
            ? (pinSection.parentElement as HTMLElement)
            : null;
          if (pinSpacer) {
            pinSpacer.style.height = `${vh}px`;
          }
        }

        const updated = getCenteringParams();
        targetScale = updated.targetScale;
        targetX = updated.targetX;
        targetY = updated.targetY;
      };

      if (typeof window !== "undefined" && window.visualViewport) {
        window.visualViewport.addEventListener("resize", handleVisualViewportResize);
      }

      // Initial element states
      gsap.set(cameraRig, {
        scale: 1,
        x: 0,
        y: 0,
        transformOrigin: "50% 50%",
        force3D: true,
      });

      gsap.set(openingText, { autoAlpha: 1, y: 0 });
      gsap.set(scrollIndicator, { autoAlpha: 1 });

      // Before/After Living Room & Kitchen Layers and TV Slider initial states
      gsap.set(tvAfterLayer, { autoAlpha: 0 });
      gsap.set(tvBeforeClipWrapper, { autoAlpha: 0 });
      gsap.set([tvBeforeBadge, tvAfterBadge, tvKitchenBeforeBadge, tvKitchenAfterBadge], {
        autoAlpha: 0,
        y: 12,
      });
      gsap.set(tvKitchenAfterLayer, { autoAlpha: 0 });
      gsap.set(tvKitchenBeforeClipWrapper, { autoAlpha: 0 });
      gsap.set(tvSliderDivider, { autoAlpha: 0 });
      gsap.set(tvGlare, { opacity: 0.85 });

      if (tvBeforeClipWrapper) {
        tvBeforeClipWrapper.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      }
      if (hudBeforeLayer) {
        hudBeforeLayer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      }
      if (hudAfterLayer) {
        hudAfterLayer.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
      }
      if (tvKitchenBeforeClipWrapper) {
        tvKitchenBeforeClipWrapper.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      }
      if (tvSliderDivider) {
        tvSliderDivider.style.left = "100%";
      }

      /* ==============================================================
         2. MASTER PINNED TIMELINE:
         ROOM + TV → TV ZOOMS & TEXT CROSS-FADES INTO BEFORE IMAGE → BEFORE/AFTER TRANSITIONS → SETTLES & UNPINS
         ============================================================== */
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: "+=420%", // Scrub distance for zoom + dual split sweeps
          pin: true,
          scrub: 0.1, // Smooth responsive scrub
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onRefresh: () => {
            const updated = getCenteringParams();
            targetScale = updated.targetScale;
            targetX = updated.targetX;
            targetY = updated.targetY;
          },
        },
      });

      /* -------------------------------------------------------------
         STEP 1: Scroll Indicator Fade Out
         ------------------------------------------------------------- */
      tl.to(
        scrollIndicator,
        {
          autoAlpha: 0,
          duration: 0.4,
          ease: "power1.out",
        },
        0.1
      );

      /* -------------------------------------------------------------
         STEP 2: TV Zooms Toward Viewer & Opening Text Moves With It
         ------------------------------------------------------------- */
      tl.to(
        cameraRig,
        {
          scale: () => targetScale,
          x: () => targetX,
          y: () => targetY,
          duration: 3.2,
          ease: "power2.inOut",
        },
        0.4
      );

      tl.to(
        roomBg,
        {
          opacity: 0,
          filter: "blur(6px)",
          duration: 2.2,
          ease: "power1.in",
        },
        0.8
      );

      tl.to(
        tvGlare,
        {
          opacity: 0,
          duration: 1.6,
          ease: "power1.out",
        },
        0.8
      );

      /* -------------------------------------------------------------
         STEP 3: SEAMLESS VISUAL HANDOFF — ZERO BLACK DEAD GAP
         - Opening text begins dissolving at 1.6s
         - Living Room Before image begins emerging underneath at 1.8s
         - Overlap: from 1.8s to 2.8s, both are actively visible during crossfade
         - By 2.8s, Before image is 100% solid & dominant as TV finishes zoom
         ------------------------------------------------------------- */
      tl.to(
        openingText,
        {
          scale: 1.28,
          duration: 2.4,
          ease: "power1.inOut",
        },
        0.4
      );

      tl.to(
        openingText,
        {
          autoAlpha: 0,
          duration: 1.2,
          ease: "power1.in",
        },
        1.6
      );

      // Living Room Before & After Layers emerge concurrently under the dissolving text
      tl.to(
        [tvAfterLayer, tvBeforeClipWrapper],
        {
          autoAlpha: 1,
          duration: 1.0,
          ease: "power1.out",
        },
        1.8
      );

      /* -------------------------------------------------------------
         STEP 4: Badges Arm & 1st Split Slider Sweep (Living Room)
         ------------------------------------------------------------- */
      // Arm badges (After badge is hidden behind hudAfterLayer's 100% clipPath until line sweeps)
      tl.to(
        [tvBeforeBadge, tvAfterBadge],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        3.6
      );

      const sliderState1 = { pos: 100 };

      // Divider handle appears at right edge (100%)
      tl.fromTo(
        tvSliderDivider,
        { autoAlpha: 0, left: "100%", opacity: 1 },
        { autoAlpha: 1, duration: 0.15, ease: "power1.out" },
        3.9
      );

      // Sweep across the screen from 100% down to 0%
      tl.to(
        sliderState1,
        {
          pos: 0,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate: () => {
            const p = sliderState1.pos;
            // Clip Living Room Before Image
            if (tvBeforeClipWrapper) {
              tvBeforeClipWrapper.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
            }
            // Move divider handle & get exact screen pixel X
            if (tvSliderDivider) {
              tvSliderDivider.style.left = `${p}%`;
              if (p < 8) {
                tvSliderDivider.style.opacity = `${p / 8}`;
              } else {
                tvSliderDivider.style.opacity = "1";
              }
              const xPx = tvSliderDivider.getBoundingClientRect().left;
              // Clip BEFORE HUD Badge (left of divider line)
              if (hudBeforeLayer) {
                hudBeforeLayer.style.clipPath = `polygon(0 0, ${xPx}px 0, ${xPx}px 100%, 0 100%)`;
              }
              // Clip AFTER HUD Badge (right of divider line - exactly on the line!)
              if (hudAfterLayer) {
                hudAfterLayer.style.clipPath = `polygon(${xPx}px 0, 100% 0, 100% 100%, ${xPx}px 100%)`;
              }
            }
          },
        },
        3.9
      );

      // Divider line fades out after sweep completes
      tl.to(
        tvSliderDivider,
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power1.in",
        },
        5.7
      );

      // Living Room badges fade out as scene transitions to Kitchen
      tl.to(
        [tvBeforeBadge, tvAfterBadge],
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.25,
          ease: "power1.in",
        },
        5.7
      );

      /* -------------------------------------------------------------
         STEP 5: Transition to Kitchen (Before / After)
         - Reset HUD clip paths for Kitchen sweep
         - Simultaneous cross-fade between living room and kitchen
         - Arm Kitchen badges
         ------------------------------------------------------------- */
      tl.set(
        {},
        {
          onComplete: () => {
            if (hudBeforeLayer) {
              hudBeforeLayer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
            }
            if (hudAfterLayer) {
              hudAfterLayer.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
            }
          },
        },
        5.95
      );

      tl.to(
        [tvKitchenAfterLayer, tvKitchenBeforeClipWrapper],
        {
          autoAlpha: 1,
          duration: 0.8,
          ease: "power1.inOut",
        },
        6.0
      );

      tl.to(
        [tvAfterLayer, tvBeforeClipWrapper],
        {
          autoAlpha: 0,
          duration: 0.5,
          ease: "power1.inOut",
        },
        6.3
      );

      // Arm Kitchen badges
      tl.to(
        [tvKitchenBeforeBadge, tvKitchenAfterBadge],
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        6.1
      );

      /* -------------------------------------------------------------
         STEP 6: 2nd Split Slider Sweep (Kitchen)
         ------------------------------------------------------------- */
      const sliderState2 = { pos: 100 };

      // Divider handle resets to right edge (100%) and appears
      tl.fromTo(
        tvSliderDivider,
        { autoAlpha: 0, left: "100%", opacity: 1 },
        { autoAlpha: 1, duration: 0.15, ease: "power1.out" },
        6.9
      );

      // Sweep across the screen from 100% down to 0%
      tl.to(
        sliderState2,
        {
          pos: 0,
          duration: 1.8,
          ease: "power1.inOut",
          onUpdate: () => {
            const p = sliderState2.pos;
            // Clip Kitchen Before Image
            if (tvKitchenBeforeClipWrapper) {
              tvKitchenBeforeClipWrapper.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
            }
            // Move divider handle & get exact screen pixel X
            if (tvSliderDivider) {
              tvSliderDivider.style.left = `${p}%`;
              if (p < 8) {
                tvSliderDivider.style.opacity = `${p / 8}`;
              } else {
                tvSliderDivider.style.opacity = "1";
              }
              const xPx = tvSliderDivider.getBoundingClientRect().left;
              // Clip BEFORE HUD Badge (left of divider line)
              if (hudBeforeLayer) {
                hudBeforeLayer.style.clipPath = `polygon(0 0, ${xPx}px 0, ${xPx}px 100%, 0 100%)`;
              }
              // Clip AFTER HUD Badge (right of divider line - exactly on the line!)
              if (hudAfterLayer) {
                hudAfterLayer.style.clipPath = `polygon(${xPx}px 0, 100% 0, 100% 100%, ${xPx}px 100%)`;
              }
            }
          },
        },
        6.9
      );

      // Divider line fades out
      tl.to(
        tvSliderDivider,
        {
          autoAlpha: 0,
          duration: 0.2,
          ease: "power1.in",
        },
        8.7
      );

      // Kitchen badges fade out as section unpins into next page section
      tl.to(
        [tvKitchenBeforeBadge, tvKitchenAfterBadge],
        {
          autoAlpha: 0,
          y: -10,
          duration: 0.3,
          ease: "power1.in",
        },
        8.8
      );

      /* -------------------------------------------------------------
         STEP 7: Content Fills Viewport & Smooth Settle / Unpin
         ------------------------------------------------------------- */
      tl.to(
        {},
        {
          duration: 0.5,
        },
        9.0
      );

      return () => {
        if (typeof window !== "undefined" && window.visualViewport) {
          window.visualViewport.removeEventListener("resize", handleVisualViewportResize);
        }
      };
    }, pinSectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={pinSectionRef}
      id="hero-cinematic-pinned-section"
      className="relative w-full bg-[#0d0d0d] overflow-hidden"
      style={{ height: "100dvh" }}
    >
      {/* Pinned Viewport Stage (100vw x 100dvh) */}
      <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
        {/* ==============================================================
            CAMERA RIG (Base Room + Masked TV Screen Layer)
            transform-origin: 50% 50%
            Target coordinates calculated dynamically from rendered bounds
            ============================================================== */}
        <div
          ref={cameraRigRef}
          id="camera-rig-stage"
          className="relative w-full h-full flex items-center justify-center gpu-accel select-none"
        >
          {/* Virtual Canvas with native 1675 x 939 aspect ratio */}
          <div
            className="relative w-full h-full"
            style={{
              aspectRatio: "1675 / 939",
              minWidth: "100vw",
              minHeight: "100dvh",
            }}
          >
            {/* 1. Base Room Scene */}
            <div
              ref={roomBgRef}
              id="base-room-scene"
              className="absolute inset-0 w-full h-full transition-[filter] duration-200"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/interior/base/tv-room.png"
                alt="Luxury living room with TV"
                className="w-full h-full object-cover object-center pointer-events-none"
                draggable={false}
              />
            </div>

            {/* 2. TV Screen Container: Positioned precisely over TV display */}
            <div
              ref={tvScreenRef}
              id="tv-display-screen"
              className="absolute overflow-hidden rounded-[2px] shadow-2xl z-10 bg-[#0d0d0d]"
              style={{
                left: "39.224%",
                top: "20.447%",
                width: "40.776%",
                height: "37.593%",
                containerType: "inline-size", // Powers responsive cqw vector typography!
              }}
            >
              {/* Layer 1: Living Room AFTER Image (Right side of divider / base under split) */}
              <div
                ref={tvAfterLayerRef}
                id="tv-after-layer"
                className="absolute inset-0 w-full h-full overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/interior/before-after/slices/living-room-after.png"
                  alt="After — Curated Living"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Layer 3: Living Room BEFORE Image (Left side of divider, clipped from 0 to p%) */}
              <div
                ref={tvBeforeClipWrapperRef}
                id="tv-before-clip-wrapper"
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/interior/before-after/slices/living-room-before.png"
                  alt="Before — Raw Shell"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Layer 4: Kitchen AFTER Image (Right side of divider / base under split) */}
              <div
                ref={tvKitchenAfterLayerRef}
                id="tv-kitchen-after-layer"
                className="absolute inset-0 w-full h-full overflow-hidden"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/interior/before-after/slices/kitchen-after.png"
                  alt="After — Culinary Suite"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Layer 5: Kitchen BEFORE Image (Left side of divider, clipped from 0 to p%) */}
              <div
                ref={tvKitchenBeforeClipWrapperRef}
                id="tv-kitchen-before-clip-wrapper"
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{
                  clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/interior/before-after/slices/kitchen-before.png"
                  alt="Before — Original Kitchen"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </div>

              {/* Slider Divider Line & Handle (Identical aesthetic to Living Room Transformation) */}
              <div
                ref={tvSliderDividerRef}
                id="tv-slider-divider"
                className="absolute top-0 bottom-0 z-25 pointer-events-none"
                style={{ left: "0%" }}
              >
                {/* Vertical Glowing Divider Line */}
                <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-white via-[#c6a77d] to-white shadow-[0_0_12px_rgba(198,167,125,0.8)]" />

                {/* Circular Handle */}
                <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-[3.2cqw] h-[3.2cqw] rounded-full bg-white/95 backdrop-blur-md shadow-2xl border border-black/10 flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
                  <svg
                    className="w-[1.4cqw] h-[1.4cqw] text-[#1a1a1a]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="15 18 9 12 15 6" />
                    <polyline points="9 18 3 12 9 6" />
                  </svg>
                  <svg
                    className="w-[1.4cqw] h-[1.4cqw] text-[#1a1a1a] -ml-[0.6cqw]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="9 18 15 12 9 6" />
                    <polyline points="15 18 21 12 15 6" />
                  </svg>
                </div>
              </div>

              {/* Physical Glass Reflection Glare (fades out completely during zoom) */}
              <div
                ref={tvGlareRef}
                id="tv-screen-reflection"
                className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-white/[0.07] via-transparent to-white/[0.04] mix-blend-overlay"
              />
            </div>

            {/* 3. Opening Typography: Positioned directly over TV display inside camera rig so it zooms forward with the TV */}
            <div
              ref={openingTextRef}
              id="opening-dom-text"
              className="absolute z-25 pointer-events-none flex flex-col items-center justify-center text-center px-4 sm:px-6"
              style={{
                left: "39.224%",
                top: "20.447%",
                width: "40.776%",
                height: "37.593%",
                transformOrigin: "50% 50%",
              }}
            >
              <div className="flex flex-col items-center gap-2.5 sm:gap-3.5 max-w-xl">
                <span className="text-[10px] sm:text-xs md:text-[13px] tracking-[0.35em] uppercase text-[#c6a77d] font-medium">
                  INTERIOR STUDIO
                </span>
                <h1 className="font-serif-luxury text-2xl sm:text-3xl md:text-5xl lg:text-[52px] xl:text-[56px] tracking-tight text-[#fbf8f3] font-light leading-[1.08] drop-shadow-lg">
                  Spaces designed<br />for living.
                </h1>
                <p className="text-[11px] sm:text-xs md:text-sm lg:text-base text-[#d0c7b8] font-light tracking-wide leading-relaxed drop-shadow max-w-md">
                  Thoughtful interiors shaped around your everyday.
                </p>
                <div className="mt-1 sm:mt-2 lg:mt-3">
                  <a
                    href="#projects"
                    className="group inline-flex items-center gap-2.5 px-4 py-1.5 sm:px-6 sm:py-2.5 rounded-full border border-white/40 hover:border-white text-xs sm:text-sm font-light text-[#f4efe6] hover:text-white transition-all duration-300 hover:bg-white/10 pointer-events-auto shadow-sm"
                  >
                    <span>Explore Our Work</span>
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
              </div>
            </div>

            {/* TV Bezel Overlay */}
            <div
              id="tv-bezel-border"
              className="absolute pointer-events-none z-20"
              style={{
                left: "38.866%",
                top: "19.808%",
                width: "41.493%",
                height: "38.871%",
                border: "2px solid rgba(20, 20, 20, 0.5)",
                boxShadow: "inset 0 0 4px rgba(0,0,0,0.8)",
              }}
            />
          </div>
        </div>

        {/* ==============================================================
            CINEMATIC TRANSFORMATION HUD (Floating Viewport Badges)
            Layer 1: BEFORE Side (clipped from 0% to p% along the divider line)
            ============================================================== */}
        <div
          ref={hudBeforeLayerRef}
          id="hero-transformation-hud-before"
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
        >
          <div className="w-full h-full p-6 sm:p-10 lg:p-12">
            <div className="w-full flex items-center justify-between pt-16 sm:pt-20">
              {/* Left: BEFORE Status Badge */}
              <div className="relative">
                {/* Living Room Before */}
                <div
                  ref={tvBeforeBadgeRef}
                  className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#101010]/75 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 ring-2 ring-white/10" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#c6a77d] uppercase font-semibold">
                    BEFORE
                  </span>
                  <span className="w-[1px] h-3 bg-white/20" />
                  <span className="text-[11px] sm:text-xs font-sans tracking-[0.16em] text-[#eae4d9] uppercase font-light">
                    Raw Shell
                  </span>
                </div>

                {/* Kitchen Before */}
                <div
                  ref={tvKitchenBeforeBadgeRef}
                  className="absolute inset-0 inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#101010]/75 backdrop-blur-xl border border-white/15 shadow-[0_8px_30px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50 ring-2 ring-white/10" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#c6a77d] uppercase font-semibold">
                    BEFORE
                  </span>
                  <span className="w-[1px] h-3 bg-white/20" />
                  <span className="text-[11px] sm:text-xs font-sans tracking-[0.16em] text-[#eae4d9] uppercase font-light">
                    Original Kitchen
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ==============================================================
            CINEMATIC TRANSFORMATION HUD (Floating Viewport Badges)
            Layer 2: AFTER Side (clipped from p% to 100% along the divider line)
            ============================================================== */}
        <div
          ref={hudAfterLayerRef}
          id="hero-transformation-hud-after"
          className="absolute inset-0 pointer-events-none z-30 overflow-hidden"
          style={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
        >
          <div className="w-full h-full p-6 sm:p-10 lg:p-12">
            <div className="w-full flex items-center justify-between pt-16 sm:pt-20">
              <div />
              {/* Right: AFTER Status Badge */}
              <div className="relative">
                {/* Living Room After */}
                <div
                  ref={tvAfterBadgeRef}
                  className="inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#142217]/80 backdrop-blur-xl border border-[#c6a77d]/40 shadow-[0_8px_30px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a77d] shadow-[0_0_8px_rgba(198,167,125,0.9)]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#c6a77d] uppercase font-semibold">
                    AFTER
                  </span>
                  <span className="w-[1px] h-3 bg-[#c6a77d]/30" />
                  <span className="text-[11px] sm:text-xs font-sans tracking-[0.16em] text-[#fbf8f3] uppercase font-light">
                    Curated Living
                  </span>
                </div>

                {/* Kitchen After */}
                <div
                  ref={tvKitchenAfterBadgeRef}
                  className="absolute inset-0 inline-flex items-center gap-2.5 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#142217]/80 backdrop-blur-xl border border-[#c6a77d]/40 shadow-[0_8px_30px_rgba(0,0,0,0.45)] select-none pointer-events-none"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#c6a77d] shadow-[0_0_8px_rgba(198,167,125,0.9)]" />
                  <span className="text-[10px] font-mono tracking-[0.25em] text-[#c6a77d] uppercase font-semibold">
                    AFTER
                  </span>
                  <span className="w-[1px] h-3 bg-[#c6a77d]/30" />
                  <span className="text-[11px] sm:text-xs font-sans tracking-[0.16em] text-[#fbf8f3] uppercase font-light">
                    Culinary Suite
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div
          ref={scrollIndicatorRef}
          id="hero-scroll-prompt"
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-3 pointer-events-none"
        >
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-[#eae4d9]/75 font-light">
            Scroll to Enter
          </span>
          <div className="w-[1px] h-8 sm:h-12 bg-gradient-to-b from-[#c6a77d] via-[#eae4d9]/40 to-transparent animate-pulse" />
        </div>
      </div>
    </section>
  );
}
