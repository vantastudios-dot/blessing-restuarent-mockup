import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const celebrationTypes = [
  {
    title: "Birthday Parties",
    image: "/images/birthday-setup.jpg",
  },
  {
    title: "Anniversaries",
    image: "/images/anniversary-table.jpg",
  },
  {
    title: "Private Events",
    image: "/images/private-dining.jpg",
  },
  {
    title: "Marriage Functions",
    image: "/images/wedding-stage.jpg",
  },
];

export default function Celebrations() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".celebrations-video",
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".celebration-heading span",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".celebration-heading", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".celebration-card",
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".celebrations-grid", start: "top 75%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const headingText = "Every Celebration Deserves A Beautiful Setting.";

  return (
    <section
      id="celebrations"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] section-padding"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Label */}
        <div className="text-center mb-8">
          <span className="text-label text-[#C7A878] font-accent">
            (CELEBRATIONS)
          </span>
        </div>

        {/* Video */}
        <div className="celebrations-video relative rounded-lg overflow-hidden mb-16 max-w-[900px] mx-auto aspect-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/celebrations-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 50%, #0A0A0A 80%)",
            }}
          />
        </div>

        {/* Heading */}
        <h2 className="celebration-heading font-display text-display-sm uppercase text-[#F6F2EB] text-center max-w-[700px] mx-auto mb-6">
          {headingText.split(" ").map((word, i) => (
            <span key={i} className="inline-block mr-[0.3em]">
              {word}
            </span>
          ))}
        </h2>

        <p className="text-body-md text-[#8A8A8A] text-center max-w-[480px] mx-auto mb-16">
          From birthday parties to anniversary dinners, private events to marriage
          functions — we create moments that last a lifetime.
        </p>

        {/* Grid */}
        <div className="celebrations-grid grid grid-cols-1 md:grid-cols-2 gap-6">
          {celebrationTypes.map((item, i) => (
            <div
              key={i}
              className="celebration-card group relative overflow-hidden rounded-lg cursor-pointer aspect-[16/10]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/70 via-[#0A0A0A]/20 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="font-display text-heading-lg uppercase text-[#F6F2EB] text-center">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
