import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    if (!section || !text) return;

    const words = text.querySelectorAll(".exp-word");

    const ctx = gsap.context(() => {
      gsap.fromTo(
        words,
        { opacity: 0.1, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.03,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom 40%",
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const sentence =
    "We created a place where dining, celebrations and unforgettable moments meet. Every dish tells a story. Every corner holds a memory. This is Blessings.";

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] flex items-center justify-center section-padding"
      style={{ minHeight: "80vh", paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div ref={textRef} className="max-w-[1200px] mx-auto text-center">
        <span className="text-label text-[#C7A878] font-accent block mb-12">
          (THE EXPERIENCE)
        </span>
        <p className="font-display text-display-sm uppercase text-[#F6F2EB] leading-[1.1]">
          {sentence.split(" ").map((word, i) => (
            <span key={i} className="exp-word inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </p>
      </div>

      {/* Decorative line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent to-[#C7A878]/30" />
    </section>
  );
}
