import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const line1Ref = useRef<HTMLParagraphElement>(null);
  const line2Ref = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    const tl = gsap.timeline({ delay: 0.3 });

    // Fade in overlay
    tl.to(overlayRef.current, { opacity: 0.4, duration: 1.5, ease: "power2.out" });

    // Word-by-word title reveal
    const titleWords = titleRef.current?.querySelectorAll("span");
    if (titleWords) {
      tl.fromTo(
        titleWords,
        { y: 40, opacity: 0, filter: "blur(8px)" },
        { y: 0, opacity: 1, filter: "blur(0px)", stagger: 0.12, duration: 0.8, ease: "power2.out" },
        "-=0.8"
      );
    }

    // Subtitle lines
    tl.fromTo(
      [line1Ref.current, line2Ref.current],
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.15, duration: 0.6, ease: "power2.out" },
      "-=0.3"
    );

    // CTA buttons
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" },
      "-=0.2"
    );

    // Scroll indicator
    tl.fromTo(
      scrollIndicatorRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 },
      "-=0.1"
    );

    return () => { tl.kill(); };
  }, [loaded]);

  const scrollToReserve = () => {
    const el = document.querySelector("#reservation");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToExplore = () => {
    const el = document.querySelector("#experience");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        onLoadedData={() => setLoaded(true)}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: 1 }}
      >
        <source src="/videos/hero-video.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-[#0A0A0A]"
        style={{ zIndex: 2, opacity: 0.7 }}
      />

      {/* Content */}
      <div
        className="relative flex flex-col items-center justify-center h-full text-center section-padding"
        style={{ zIndex: 3 }}
      >
        <h1
          ref={titleRef}
          className="font-display text-display-xl uppercase text-[#F6F2EB] mb-6"
        >
          {"BLESSINGS".split("").map((char, i) => (
            <span key={i} className="inline-block" style={{ opacity: 0 }}>
              {char}
            </span>
          ))}
        </h1>

        <p
          ref={line1Ref}
          className="font-body text-body-lg text-[#F6F2EB]/60 mb-2"
          style={{ opacity: 0 }}
        >
          More Than A Restaurant.
        </p>

        <p
          ref={line2Ref}
          className="font-body text-body-lg text-[#F6F2EB]/60 mb-12"
          style={{ opacity: 0 }}
        >
          A Destination For Celebrations.
        </p>

        <div ref={ctaRef} className="flex flex-wrap gap-4 justify-center" style={{ opacity: 0 }}>
          <button onClick={scrollToReserve} className="btn-primary">
            Reserve Table
          </button>
          <button onClick={scrollToExplore} className="btn-secondary">
            Explore Experience
          </button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        style={{ zIndex: 3, opacity: 0 }}
      >
        <div className="w-[1px] h-20 bg-[#F6F2EB]/20 relative overflow-hidden">
          <div className="w-1.5 h-1.5 rounded-full bg-[#C7A878] absolute left-1/2 -translate-x-1/2 animate-scroll-indicator" />
        </div>
      </div>
    </section>
  );
}
