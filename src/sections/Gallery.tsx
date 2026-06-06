import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const images = [
  "/images/exterior-building.jpg",
  "/images/dining-hall-lights.jpg",
  "/images/chilli-paneer.jpg",
  "/images/coffee-art.jpg",
  "/images/wedding-stage.jpg",
  "/images/chocolate-cake.jpg",
  "/images/dining-roses.jpg",
  "/images/biryani.jpg",
  "/images/freak-shake.jpg",
  "/images/cappuccino.jpg",
  "/images/birthday-setup.jpg",
  "/images/exterior-glass.jpg",
  "/images/reservation-ambience.jpg",
  "/images/marriage-lawn.jpg",
  "/images/private-dining.jpg",
];

export default function Gallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const ctx = gsap.context(() => {
      // Horizontal Scroll Calculation
      const getScrollAmount = () => {
        const trackWidth = track.scrollWidth;
        const viewportWidth = window.innerWidth;
        return -(trackWidth - viewportWidth);
      };

      // Main Horizontal Tween
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollAmount() * -1}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Parallax Image Effect
      const imgs = gsap.utils.toArray<HTMLImageElement>(".gallery-image");
      imgs.forEach((img) => {
        gsap.fromTo(
          img,
          { xPercent: -15 },
          {
            xPercent: 15,
            ease: "none",
            scrollTrigger: {
              trigger: img.parentElement,
              containerAnimation: tween,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef} 
      id="gallery" 
      className="relative bg-[#0A0A0A] overflow-hidden h-screen flex flex-col"
    >
      {/* Fixed Header */}
      <div className="absolute top-12 left-8 md:top-16 md:left-24 z-10 mix-blend-difference pointer-events-none">
        <span className="text-label text-[#C7A878] font-accent block mb-2">(GALLERY)</span>
        <h2 className="font-display text-display-sm uppercase text-[#F6F2EB]">
          A Visual Journey
        </h2>
      </div>

      {/* Horizontal Track */}
      <div 
        ref={trackRef} 
        className="flex h-full items-center pl-[15vw] pr-[20vw] gap-12 md:gap-24 pt-24 pb-12"
        style={{ width: "fit-content" }}
      >
        {images.map((src, i) => {
          // Dynamic visual rhythm
          const isLandscape = i % 3 === 0;
          const isLarge = i % 5 === 0;
          
          let widthClass = "w-[75vw] md:w-[35vw]";
          let heightClass = "h-[50vh] md:h-[55vh]";

          if (isLandscape) {
            widthClass = "w-[85vw] md:w-[50vw]";
            heightClass = "h-[45vh] md:h-[50vh]";
          } else if (isLarge) {
            widthClass = "w-[80vw] md:w-[45vw]";
            heightClass = "h-[60vh] md:h-[70vh]";
          }

          // Alternate vertical alignment for a curated, less rigid feel
          const alignClass = i % 2 === 0 ? "self-start mt-[5vh]" : "self-end mb-[5vh]";

          return (
            <div 
              key={i} 
              className={`relative overflow-hidden shrink-0 ${widthClass} ${heightClass} ${alignClass}`}
            >
              {/* Image container expanded for parallax sliding room */}
              <div className="absolute inset-y-0 left-[-20%] w-[140%]">
                <img
                  src={src}
                  alt={`Gallery showcase ${i + 1}`}
                  className="gallery-image w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
