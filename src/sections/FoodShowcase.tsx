import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const dishes = [
  { name: "Chilli Paneer", image: "/images/chilli-paneer.jpg", category: "Chinese" },
  { name: "Biryani", image: "/images/biryani.jpg", category: "Indian" },
  { name: "Chocolate Cake", image: "/images/chocolate-cake.jpg", category: "Bakery" },
  { name: "Freak Shake", image: "/images/freak-shake.jpg", category: "Cafe" },
  { name: "Cappuccino", image: "/images/cappuccino.jpg", category: "Cafe" },
  { name: "Coffee Art", image: "/images/coffee-art.jpg", category: "Cafe" },
];

export default function FoodShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".food-header",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".food-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: { trigger: ".food-grid", start: "top 75%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0A0A0A] section-padding"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="food-header text-center mb-16">
          <span className="text-label text-[#C7A878] font-accent block mb-4">
            (CULINARY HIGHLIGHTS)
          </span>
          <h2 className="font-display text-display-sm uppercase text-[#F6F2EB]">
            From Our Kitchen
          </h2>
        </div>

        {/* Video */}
        <div className="relative rounded-lg overflow-hidden mb-16 aspect-video">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/videos/food-showcase-video.mp4" type="video/mp4" />
          </video>
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle, transparent 40%, #0A0A0A 100%)",
            }}
          />
        </div>

        {/* Food Grid */}
        <div className="food-grid grid grid-cols-2 md:grid-cols-3 gap-6">
          {dishes.map((dish, i) => (
            <div
              key={i}
              className="food-card group relative overflow-hidden rounded-lg cursor-pointer"
            >
              <img
                src={dish.image}
                alt={dish.name}
                className="w-full aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 p-6">
                <span className="text-label text-[#C7A878] block mb-1">
                  {dish.category}
                </span>
                <h3 className="font-display text-heading-md text-[#F6F2EB] uppercase">
                  {dish.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
