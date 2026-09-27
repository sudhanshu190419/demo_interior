"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function HeroCinematic() {
  const pinSectionRef = useRef<HTMLDivElement>(null);
  const cameraRigRef = useRef<HTMLDivElement>(null);
  const roomBgRef = useRef<HTMLDivElement>(null);
  const virtualCanvasRef = useRef<HTMLDivElement>(null);
  const tvScreenRef = useRef<HTMLDivElement>(null);

  // Desktop In-TV Before/After Refs (>= 1024px)
  const desktopAfterLayerRef = useRef<HTMLDivElement>(null);
  const desktopBeforeClipWrapperRef = useRef<HTMLDivElement>(null);
  const desktopKitchenAfterLayerRef = useRef<HTMLDivElement>(null);
  const desktopKitchenBeforeClipWrapperRef = useRef<HTMLDivElement>(null);
  const desktopSliderDividerRef = useRef<HTMLDivElement>(null);

  // Mobile Fullscreen Before/After Refs (< 1024px)
  const mobileAfterLayerRef = useRef<HTMLDivElement>(null);
  const mobileBeforeClipWrapperRef = useRef<HTMLDivElement>(null);
  const mobileKitchenAfterLayerRef = useRef<HTMLDivElement>(null);
  const mobileKitchenBeforeClipWrapperRef = useRef<HTMLDivElement>(null);
  const mobileSliderDividerRef = useRef<HTMLDivElement>(null);

  // Floating Viewport HUD Badges & Overlays (Shared)
  const tvBeforeBadgeRef = useRef<HTMLDivElement>(null);
  const tvAfterBadgeRef = useRef<HTMLDivElement>(null);
  const tvKitchenBeforeBadgeRef = useRef<HTMLDivElement>(null);
  const tvKitchenAfterBadgeRef = useRef<HTMLDivElement>(null);
  const hudBeforeLayerRef = useRef<HTMLDivElement>(null);
  const hudAfterLayerRef = useRef<HTMLDivElement>(null);
  const tvGlareRef = useRef<HTMLDivElement>(null);
  const openingTextRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const pinSection = pinSectionRef.current;
    const cameraRig = cameraRigRef.current;
    const roomBg = roomBgRef.current;
    const tvScreen = tvScreenRef.current;

    const desktopAfterLayer = desktopAfterLayerRef.current;
    const desktopBeforeClipWrapper = desktopBeforeClipWrapperRef.current;
    const desktopKitchenAfterLayer = desktopKitchenAfterLayerRef.current;
    const desktopKitchenBeforeClipWrapper = desktopKitchenBeforeClipWrapperRef.current;
    const desktopSliderDivider = desktopSliderDividerRef.current;

    const mobileAfterLayer = mobileAfterLayerRef.current;
    const mobileBeforeClipWrapper = mobileBeforeClipWrapperRef.current;
    const mobileKitchenAfterLayer = mobileKitchenAfterLayerRef.current;
    const mobileKitchenBeforeClipWrapper = mobileKitchenBeforeClipWrapperRef.current;
    const mobileSliderDivider = mobileSliderDividerRef.current;

    const tvBeforeBadge = tvBeforeBadgeRef.current;
    const tvAfterBadge = tvAfterBadgeRef.current;
    const tvKitchenBeforeBadge = tvKitchenBeforeBadgeRef.current;
    const tvKitchenAfterBadge = tvKitchenAfterBadgeRef.current;
    const hudBeforeLayer = hudBeforeLayerRef.current;
    const hudAfterLayer = hudAfterLayerRef.current;
    const tvGlare = tvGlareRef.current;
    const openingText = openingTextRef.current;
    const scrollIndicator = scrollIndicatorRef.current;

    if (!pinSection || !cameraRig || !tvScreen) return;

    /* ==============================================================
       MATHEMATICAL VIEWPORT CENTERING CALCULATION (Zero-Mutation / Pure)
       - Measures untransformed TV geometry via layout properties (offsetLeft, offsetTop, offsetWidth, offsetHeight)
       - Invariant to window.scrollY, cameraRig scale/translation, and GSAP timeline progress
       - NEVER mutates cameraRig transform during calculation or onRefresh()
       ============================================================== */
    const getCenteringParams = () => {
      const isDesktop = window.innerWidth >= 1024;
      const vpW = window.innerWidth;
      const vpH = window.innerHeight;
      const vpCenterX = vpW / 2;
      const vpCenterY = vpH / 2;

      // Untransformed virtual canvas dimensions
      const canvasEl = virtualCanvasRef.current || (tvScreen.offsetParent as HTMLElement);
      const canvasW = canvasEl && canvasEl.offsetWidth > 0 ? canvasEl.offsetWidth : Math.max(vpW, vpH * (isDesktop ? 1675 / 939 : 941 / 1672));
      const canvasH = canvasEl && canvasEl.offsetHeight > 0 ? canvasEl.offsetHeight : Math.max(vpH, vpW / (isDesktop ? 1675 / 939 : 941 / 1672));

      // Untransformed TV dimensions and offsets relative to the virtual canvas
      const tvW = tvScreen.offsetWidth > 0 ? tvScreen.offsetWidth : (canvasW * (isDesktop ? 0.40776 : 0.63656));
      const tvH = tvScreen.offsetHeight > 0 ? tvScreen.offsetHeight : (canvasH * (isDesktop ? 0.37593 : 0.21950));
      const tvLeftInCanvas = typeof tvScreen.offsetLeft === "number" && tvScreen.offsetLeft > 0 ? tvScreen.offsetLeft : (canvasW * (isDesktop ? 0.39224 : 0.14878));
      const tvTopInCanvas = typeof tvScreen.offsetTop === "number" && tvScreen.offsetTop > 0 ? tvScreen.offsetTop : (canvasH * (isDesktop ? 0.20447 : 0.30084));

      // Virtual canvas is centered in the viewport stage (flex items-center justify-center)
      const canvasLeftInViewport = (vpW - canvasW) / 2;
      const canvasTopInViewport = (vpH - canvasH) / 2;

      // Untransformed TV center in viewport coordinates
      const tvCenterX = canvasLeftInViewport + tvLeftInCanvas + tvW / 2;
      const tvCenterY = canvasTopInViewport + tvTopInCanvas + tvH / 2;

      const ox = tvCenterX - vpCenterX;
      const oy = tvCenterY - vpCenterY;

      const scaleX = vpW / tvW;
      const scaleY = vpH / tvH;
      const isPortrait = vpH > vpW;
      const targetScale = Math.max(scaleX, scaleY) * (isPortrait ? 1.65 : 1.05);

      const targetX = -ox * targetScale;
      const targetY = -oy * targetScale;

      return { targetScale, targetX, targetY };
    };

    const mm = gsap.matchMedia();

    /* ==============================================================
       1. DESKTOP TIMELINE (>= 1024px)
       - Living Room Reveal: 6.0s (t = 3.9s -> 9.9s)
       - Kitchen Reveal: 6.0s (t = 11.1s -> 17.1s)
       - Total Timeline Duration: 17.9s
       ============================================================== */
    mm.add("(min-width: 1024px)", () => {
      let { targetScale, targetX, targetY } = getCenteringParams();

      // Initial Desktop states
      gsap.set(cameraRig, { scale: 1, x: 0, y: 0, transformOrigin: "50% 50%", force3D: true });
      gsap.set(openingText, { autoAlpha: 1, y: 0 });
      gsap.set(scrollIndicator, { autoAlpha: 1 });
      gsap.set([desktopAfterLayer, desktopBeforeClipWrapper, desktopKitchenAfterLayer, desktopKitchenBeforeClipWrapper, desktopSliderDivider], { autoAlpha: 0 });
      gsap.set([tvBeforeBadge, tvAfterBadge, tvKitchenBeforeBadge, tvKitchenAfterBadge], { autoAlpha: 0, y: 12 });
      gsap.set(tvGlare, { opacity: 0.85 });

      if (desktopBeforeClipWrapper) desktopBeforeClipWrapper.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      if (desktopKitchenBeforeClipWrapper) desktopKitchenBeforeClipWrapper.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      if (desktopSliderDivider) desktopSliderDivider.style.left = "100%";
      if (hudBeforeLayer) hudBeforeLayer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      if (hudAfterLayer) hudAfterLayer.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 0.1,
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

      // Step 1: Scroll indicator
      tl.to(scrollIndicator, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, 0.1);

      // Step 2: Camera Rig Zoom (Identical 3.2s zoom)
      tl.to(cameraRig, { scale: () => targetScale, x: () => targetX, y: () => targetY, duration: 3.2, ease: "power2.inOut" }, 0.4);
      tl.to(roomBg, { opacity: 0, filter: "blur(6px)", duration: 2.2, ease: "power1.in" }, 0.8);
      tl.to(tvGlare, { opacity: 0, duration: 1.6, ease: "power1.out" }, 0.8);

      // Step 3: Opening Text Zoom & Before Layer Fade In
      tl.to(openingText, { autoAlpha: 0, duration: 1.0, ease: "power2.in" }, 0.8);
      tl.to(desktopBeforeClipWrapper, { autoAlpha: 1, duration: 1.0, ease: "power1.out" }, 1.8);
      tl.set(desktopAfterLayer, { autoAlpha: 1 }, 2.8);

      // Step 4: Badges Arm & Living Room Reveal (6.0s sweep)
      tl.to([tvBeforeBadge, tvAfterBadge], { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 3.6);
      tl.fromTo(desktopSliderDivider, { autoAlpha: 0, left: "100%", opacity: 1 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, 3.9);

      const sliderState1 = { pos: 100 };
      tl.to(sliderState1, {
        pos: 0,
        duration: 6.0,
        ease: "power1.inOut",
        onUpdate: () => {
          const p = sliderState1.pos;
          if (desktopBeforeClipWrapper) desktopBeforeClipWrapper.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
          if (desktopSliderDivider) {
            desktopSliderDivider.style.left = `${p}%`;
            desktopSliderDivider.style.opacity = p < 8 ? `${p / 8}` : "1";
            const xPx = desktopSliderDivider.getBoundingClientRect().left;
            if (hudBeforeLayer) hudBeforeLayer.style.clipPath = `polygon(0 0, ${xPx}px 0, ${xPx}px 100%, 0 100%)`;
            if (hudAfterLayer) hudAfterLayer.style.clipPath = `polygon(${xPx}px 0, 100% 0, 100% 100%, ${xPx}px 100%)`;
          }
        },
      }, 3.9);

      tl.to(desktopSliderDivider, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, 9.9);
      tl.to([tvBeforeBadge, tvAfterBadge], { autoAlpha: 0, y: -10, duration: 0.3, ease: "power1.in" }, 9.9);

      // Step 5: Transition to Kitchen
      tl.set({}, {
        onComplete: () => {
          if (hudBeforeLayer) hudBeforeLayer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
          if (hudAfterLayer) hudAfterLayer.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
        },
      }, 10.15);

      tl.to(desktopKitchenBeforeClipWrapper, { autoAlpha: 1, duration: 0.8, ease: "power1.inOut" }, 10.2);
      tl.to([desktopAfterLayer, desktopBeforeClipWrapper], { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" }, 10.5);
      tl.set(desktopKitchenAfterLayer, { autoAlpha: 1 }, 11.0);
      tl.to([tvKitchenBeforeBadge, tvKitchenAfterBadge], { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 10.3);

      // Step 6: 2nd Split Slider Sweep (Kitchen - 6.0s sweep)
      const sliderState2 = { pos: 100 };
      tl.fromTo(desktopSliderDivider, { autoAlpha: 0, left: "100%", opacity: 1 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, 11.1);
      tl.to(sliderState2, {
        pos: 0,
        duration: 6.0,
        ease: "power1.inOut",
        onUpdate: () => {
          const p = sliderState2.pos;
          if (desktopKitchenBeforeClipWrapper) desktopKitchenBeforeClipWrapper.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
          if (desktopSliderDivider) {
            desktopSliderDivider.style.left = `${p}%`;
            desktopSliderDivider.style.opacity = p < 8 ? `${p / 8}` : "1";
            const xPx = desktopSliderDivider.getBoundingClientRect().left;
            if (hudBeforeLayer) hudBeforeLayer.style.clipPath = `polygon(0 0, ${xPx}px 0, ${xPx}px 100%, 0 100%)`;
            if (hudAfterLayer) hudAfterLayer.style.clipPath = `polygon(${xPx}px 0, 100% 0, 100% 100%, ${xPx}px 100%)`;
          }
        },
      }, 11.1);

      tl.to(desktopSliderDivider, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, 17.1);
      tl.to([tvKitchenBeforeBadge, tvKitchenAfterBadge], { autoAlpha: 0, y: -10, duration: 0.3, ease: "power1.in" }, 17.15);

      // Step 7: Settle & Unpin
      tl.to({}, { duration: 0.5 }, 17.4);
    });

    /* ==============================================================
       2. MOBILE TIMELINE (< 1024px)
       - Living Room Reveal: 4.5s (t = 3.9s -> 8.4s)
       - Kitchen Reveal: 4.5s (t = 9.6s -> 14.1s)
       - Total Timeline Duration: 14.9s
       ============================================================== */
    mm.add("(max-width: 1023px)", () => {
      let { targetScale, targetX, targetY } = getCenteringParams();

      // Initial Mobile states
      gsap.set(cameraRig, { scale: 1, x: 0, y: 0, transformOrigin: "50% 50%", force3D: true });
      gsap.set(openingText, { autoAlpha: 1, y: 0 });
      gsap.set(scrollIndicator, { autoAlpha: 1 });
      gsap.set([mobileAfterLayer, mobileBeforeClipWrapper, mobileKitchenAfterLayer, mobileKitchenBeforeClipWrapper, mobileSliderDivider], { autoAlpha: 0 });
      gsap.set([tvBeforeBadge, tvAfterBadge, tvKitchenBeforeBadge, tvKitchenAfterBadge], { autoAlpha: 0, y: 12 });
      gsap.set(tvGlare, { opacity: 0.85 });

      if (mobileBeforeClipWrapper) mobileBeforeClipWrapper.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      if (mobileKitchenBeforeClipWrapper) mobileKitchenBeforeClipWrapper.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      if (mobileSliderDivider) mobileSliderDivider.style.left = "100%";
      if (hudBeforeLayer) hudBeforeLayer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
      if (hudAfterLayer) hudAfterLayer.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSection,
          start: "top top",
          end: "+=420%",
          pin: true,
          scrub: 0.1,
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

      // Step 1: Scroll indicator
      tl.to(scrollIndicator, { autoAlpha: 0, duration: 0.4, ease: "power1.out" }, 0.1);

      // Step 2: Camera Rig Zoom (Identical 3.2s zoom)
      tl.to(cameraRig, { scale: () => targetScale, x: () => targetX, y: () => targetY, duration: 3.2, ease: "power2.inOut" }, 0.4);
      tl.to(roomBg, { opacity: 0, filter: "blur(6px)", duration: 2.2, ease: "power1.in" }, 0.8);
      tl.to(tvGlare, { opacity: 0, duration: 1.6, ease: "power1.out" }, 0.8);

      // Step 3: Opening Text Zoom & Before Layer Fade In
      tl.to(openingText, { autoAlpha: 0, duration: 1.0, ease: "power2.in" }, 0.8);
      tl.to(mobileBeforeClipWrapper, { autoAlpha: 1, duration: 1.0, ease: "power1.out" }, 1.8);
      tl.set(mobileAfterLayer, { autoAlpha: 1 }, 2.8);

      // Step 4: Badges Arm & Living Room Reveal (4.5s sweep)
      tl.to([tvBeforeBadge, tvAfterBadge], { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 3.6);
      tl.fromTo(mobileSliderDivider, { autoAlpha: 0, left: "100%", opacity: 1 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, 3.9);

      const sliderState1 = { pos: 100 };
      tl.to(sliderState1, {
        pos: 0,
        duration: 4.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const p = sliderState1.pos;
          if (mobileBeforeClipWrapper) mobileBeforeClipWrapper.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
          if (mobileSliderDivider) {
            mobileSliderDivider.style.left = `${p}%`;
            mobileSliderDivider.style.opacity = p < 8 ? `${p / 8}` : "1";
            const xPx = mobileSliderDivider.getBoundingClientRect().left;
            if (hudBeforeLayer) hudBeforeLayer.style.clipPath = `polygon(0 0, ${xPx}px 0, ${xPx}px 100%, 0 100%)`;
            if (hudAfterLayer) hudAfterLayer.style.clipPath = `polygon(${xPx}px 0, 100% 0, 100% 100%, ${xPx}px 100%)`;
          }
        },
      }, 3.9);

      tl.to(mobileSliderDivider, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, 8.4);
      tl.to([tvBeforeBadge, tvAfterBadge], { autoAlpha: 0, y: -10, duration: 0.3, ease: "power1.in" }, 8.4);

      // Step 5: Transition to Kitchen
      tl.set({}, {
        onComplete: () => {
          if (hudBeforeLayer) hudBeforeLayer.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";
          if (hudAfterLayer) hudAfterLayer.style.clipPath = "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";
        },
      }, 8.65);

      tl.to(mobileKitchenBeforeClipWrapper, { autoAlpha: 1, duration: 0.8, ease: "power1.inOut" }, 8.7);
      tl.to([mobileAfterLayer, mobileBeforeClipWrapper], { autoAlpha: 0, duration: 0.5, ease: "power1.inOut" }, 9.0);
      tl.set(mobileKitchenAfterLayer, { autoAlpha: 1 }, 9.5);
      tl.to([tvKitchenBeforeBadge, tvKitchenAfterBadge], { autoAlpha: 1, y: 0, duration: 0.35, ease: "power2.out" }, 8.8);

      // Step 6: 2nd Split Slider Sweep (Kitchen - 4.5s sweep)
      const sliderState2 = { pos: 100 };
      tl.fromTo(mobileSliderDivider, { autoAlpha: 0, left: "100%", opacity: 1 }, { autoAlpha: 1, duration: 0.2, ease: "power1.out" }, 9.6);
      tl.to(sliderState2, {
        pos: 0,
        duration: 4.5,
        ease: "power1.inOut",
        onUpdate: () => {
          const p = sliderState2.pos;
          if (mobileKitchenBeforeClipWrapper) mobileKitchenBeforeClipWrapper.style.clipPath = `polygon(0 0, ${p}% 0, ${p}% 100%, 0 100%)`;
          if (mobileSliderDivider) {
            mobileSliderDivider.style.left = `${p}%`;
            mobileSliderDivider.style.opacity = p < 8 ? `${p / 8}` : "1";
            const xPx = mobileSliderDivider.getBoundingClientRect().left;
            if (hudBeforeLayer) hudBeforeLayer.style.clipPath = `polygon(0 0, ${xPx}px 0, ${xPx}px 100%, 0 100%)`;
            if (hudAfterLayer) hudAfterLayer.style.clipPath = `polygon(${xPx}px 0, 100% 0, 100% 100%, ${xPx}px 100%)`;
          }
        },
      }, 9.6);

      tl.to(mobileSliderDivider, { autoAlpha: 0, duration: 0.25, ease: "power1.in" }, 14.1);
      tl.to([tvKitchenBeforeBadge, tvKitchenAfterBadge], { autoAlpha: 0, y: -10, duration: 0.3, ease: "power1.in" }, 14.15);

      // Step 7: Settle & Unpin
      tl.to({}, { duration: 0.5 }, 14.4);
    });

    return () => mm.revert();
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
          {/* Virtual Canvas with native 941x1672 on mobile (<1024px), 1675x939 on desktop (>=1024px) */}
          <div
            ref={virtualCanvasRef}
            className="relative w-full h-full aspect-[941/1672] lg:aspect-[1675/939] min-w-[100vw] min-h-[100dvh]"
          >
            {/* 1. Base Room Scene */}
            <div
              ref={roomBgRef}
              id="base-room-scene"
              className="absolute inset-0 w-full h-full transition-[filter] duration-200"
            >
              <picture className="w-full h-full block">
                <source
                  media="(max-width: 1023px)"
                  srcSet="/interior/base/tv-room-mobile.png"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/interior/base/tv-room.png"
                  alt="Luxury living room with TV"
                  className="w-full h-full object-cover object-center pointer-events-none"
                  draggable={false}
                />
              </picture>
            </div>

            {/* 2. TV Screen Container: Positioned precisely over TV display on the wall */}
            <div
              ref={tvScreenRef}
              id="tv-display-screen"
              className="absolute overflow-hidden rounded-[2px] shadow-2xl z-10 bg-[#0d0d0d] left-[14.878%] top-[30.084%] w-[63.656%] h-[21.950%] lg:left-[39.224%] lg:top-[20.447%] lg:w-[40.776%] lg:h-[37.593%]"
              style={{
                containerType: "inline-size", // Powers responsive cqw vector typography!
              }}
            >
              {/* ==============================================================
                  DESKTOP BEFORE / AFTER TRANSFORMATION LAYERS (>= 1024px)
                  - Lives inside TV Screen container with overflow:hidden
                  - Scales and moves in lockstep with cameraRig
                  - Physically clipped to TV screen until zoom reaches full viewport
                  ============================================================== */}
              <div className="hidden lg:block absolute inset-0 w-full h-full">
                {/* Layer 1: Living Room AFTER Image (Desktop) */}
                <div
                  ref={desktopAfterLayerRef}
                  id="desktop-tv-after-layer"
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

                {/* Layer 3: Living Room BEFORE Image (Desktop) */}
                <div
                  ref={desktopBeforeClipWrapperRef}
                  id="desktop-tv-before-clip-wrapper"
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

                {/* Layer 4: Kitchen AFTER Image (Desktop) */}
                <div
                  ref={desktopKitchenAfterLayerRef}
                  id="desktop-tv-kitchen-after-layer"
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

                {/* Layer 5: Kitchen BEFORE Image (Desktop) */}
                <div
                  ref={desktopKitchenBeforeClipWrapperRef}
                  id="desktop-tv-kitchen-before-clip-wrapper"
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

                {/* Desktop Slider Divider Guide (Invisible positioning anchor for HUD clipping) */}
                <div
                  ref={desktopSliderDividerRef}
                  id="desktop-tv-slider-divider"
                  className="absolute top-0 bottom-0 z-25 pointer-events-none"
                  style={{ left: "0%" }}
                />
              </div>

              {/* Physical Glass Reflection Glare (fades out completely during zoom) */}
              <div
                ref={tvGlareRef}
                id="tv-screen-reflection"
                className="absolute inset-0 pointer-events-none z-30 bg-gradient-to-tr from-white/[0.07] via-transparent to-white/[0.04] mix-blend-overlay"
              />

              {/* 3. Opening Typography: Rendered INSIDE the TV display screen on the wall */}
              <div
                ref={openingTextRef}
                id="opening-dom-text"
                className="absolute inset-0 z-25 pointer-events-none flex flex-col items-center justify-center text-center px-2 py-2 sm:px-4 sm:py-3 lg:px-6 lg:py-4"
                style={{
                  transformOrigin: "50% 50%",
                }}
              >
                <div className="flex flex-col items-center gap-1 sm:gap-2 lg:gap-3.5 max-w-[92%] sm:max-w-md lg:max-w-xl">
                  <span className="text-[7.5px] sm:text-[9.5px] md:text-xs lg:text-[13px] tracking-[0.25em] sm:tracking-[0.35em] uppercase text-[#c6a77d] font-medium">
                    INTERIOR STUDIO
                  </span>
                  <h1 className="font-serif-luxury text-[13px] sm:text-xl md:text-3xl lg:text-[52px] xl:text-[56px] tracking-tight text-[#fbf8f3] font-light leading-[1.08] drop-shadow-lg">
                    Spaces designed<br />for living.
                  </h1>
                  <p className="text-[7px] sm:text-[9.5px] md:text-xs lg:text-base text-[#d0c7b8] font-light tracking-wide leading-tight sm:leading-relaxed drop-shadow max-w-[200px] sm:max-w-xs lg:max-w-md">
                    Thoughtful interiors shaped around your everyday.
                  </p>
                  <div className="mt-0.5 sm:mt-1.5 lg:mt-3">
                    <a
                      href="#projects"
                      className="group inline-flex items-center gap-1 sm:gap-2.5 px-2 py-0.5 sm:px-4 sm:py-1.5 lg:px-6 lg:py-2.5 rounded-full border border-white/40 hover:border-white text-[7.5px] sm:text-xs lg:text-sm font-light text-[#f4efe6] hover:text-white transition-all duration-300 hover:bg-white/10 pointer-events-auto shadow-sm"
                    >
                      <span>Explore Our Work</span>
                      <svg
                        className="w-2 h-2 sm:w-3.5 sm:h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
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
            </div>

            {/* TV Bezel Overlay (only on desktop where bezel is a synthetic overlay) */}
            <div
              id="tv-bezel-border"
              className="absolute pointer-events-none z-20 hidden lg:block"
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
            MOBILE FULLSCREEN BEFORE / AFTER TRANSFORMATION PRESENTATION STAGE (< 1024px)
            - Dedicated 9:16 portrait mobile stage mapping 1:1 to viewport (100vw x 100dvh)
            - Preserves uncropped full-height portrait room composition
            - Hidden on desktop (lg:hidden) so it NEVER renders on desktop
            ============================================================== */}
        <div
          id="fullscreen-before-after-stage"
          className="lg:hidden absolute inset-0 w-full h-full z-15 overflow-hidden pointer-events-none"
        >
          {/* Layer 1: Living Room AFTER Image (Mobile Portrait) */}
          <div
            ref={mobileAfterLayerRef}
            id="mobile-tv-after-layer"
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior/before-after/slices/living-room-after-mobile.png"
              alt="After — Curated Living"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Layer 3: Living Room BEFORE Image (Mobile Portrait) */}
          <div
            ref={mobileBeforeClipWrapperRef}
            id="mobile-tv-before-clip-wrapper"
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior/before-after/slices/living-room-before-mobile.png"
              alt="Before — Raw Shell"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Layer 4: Kitchen AFTER Image (Mobile Portrait) */}
          <div
            ref={mobileKitchenAfterLayerRef}
            id="mobile-tv-kitchen-after-layer"
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior/before-after/slices/kitchen-after-mobile.png"
              alt="After — Culinary Suite"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Layer 5: Kitchen BEFORE Image (Mobile Portrait) */}
          <div
            ref={mobileKitchenBeforeClipWrapperRef}
            id="mobile-tv-kitchen-before-clip-wrapper"
            className="absolute inset-0 w-full h-full overflow-hidden"
            style={{
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/interior/before-after/slices/kitchen-before-mobile.png"
              alt="Before — Original Kitchen"
              className="w-full h-full object-cover object-center pointer-events-none"
              draggable={false}
            />
          </div>

          {/* Mobile Slider Divider Line & Handle */}
          <div
            ref={mobileSliderDividerRef}
            id="mobile-tv-slider-divider"
            className="absolute top-0 bottom-0 z-25 pointer-events-none"
            style={{ left: "0%" }}
          >
            {/* Vertical Glowing Divider Line */}
            <div className="absolute top-0 bottom-0 -left-[1px] w-[2px] bg-gradient-to-b from-white via-[#c6a77d] to-white shadow-[0_0_12px_rgba(198,167,125,0.8)]" />

            {/* Circular Handle */}
            <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/95 backdrop-blur-md shadow-2xl border border-black/10 flex items-center justify-center pointer-events-auto hover:scale-110 transition-transform">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a1a1a]"
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
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#1a1a1a] -ml-1.5"
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
