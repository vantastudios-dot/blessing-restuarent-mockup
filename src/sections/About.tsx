import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const reviews = [
  {
    quote: "Good service and staff are very friendly. The food is absolutely delicious!",
    author: "Happy Guest",
  },
  {
    quote: "Beautiful ambience and elegant interiors. A perfect dining experience.",
    author: "Regular Visitor",
  },
  {
    quote: "Perfect place for family gatherings. We celebrated our anniversary here.",
    author: "Celebration Guest",
  },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-left",
        { x: -60, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".about-img-1",
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 60%" },
        }
      );

      gsap.fromTo(
        ".about-img-2",
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 60%" },
        }
      );

      gsap.fromTo(
        ".about-stat",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 80%" },
        }
      );

      gsap.fromTo(
        ".review-card",
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".reviews-row", start: "top 85%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] section-padding"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column */}
          <div className="about-left">
            <span className="text-label text-[#C7A878] font-accent block mb-6">
              (ABOUT BLESSINGS)
            </span>

            <h2 className="font-display text-display-sm uppercase text-[#F6F2EB] mb-8">
              Where Every Detail Is Designed For You.
            </h2>

            <p className="font-body text-body-md text-[#8A8A8A] max-w-[520px] mb-12">
              Located in the heart of Deoria, Blessings is more than a restaurant — it is a
              sanctuary for those who appreciate fine food, elegant spaces, and warm hospitality.
              From intimate dinners to grand celebrations, every moment here is crafted with care.
            </p>

            {/* Stats */}
            <div className="about-stats flex flex-wrap gap-8 mb-12">
              <div className="about-stat">
                <div className="font-display text-display-sm text-[#C7A878]">4.8</div>
                <div className="text-label text-[#8A8A8A] mt-1">Rating</div>
              </div>
              <div className="about-stat">
                <div className="font-display text-display-sm text-[#C7A878]">2463+</div>
                <div className="text-label text-[#8A8A8A] mt-1">Reviews</div>
              </div>
              <div className="about-stat">
                <div className="font-display text-display-sm text-[#C7A878]">15K+</div>
                <div className="text-label text-[#8A8A8A] mt-1">Happy Guests</div>
              </div>
            </div>
          </div>

          {/* Right Column - Images */}
          <div className="relative">
            <div className="about-img-1 w-[85%]">
              <img
                src="/images/dining-hall-lights.jpg"
                alt="Elegant dining hall"
                className="w-full aspect-[4/5] object-cover rounded"
              />
            </div>
            <div className="about-img-2 w-[80%] ml-auto -mt-[30%] relative z-10">
              <img
                src="/images/dining-roses.jpg"
                alt="Table setting with roses"
                className="w-full aspect-[4/5] object-cover rounded"
              />
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="reviews-row grid grid-cols-1 md:grid-cols-3 gap-6 mt-24">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="review-card border border-[#1A1A1A] rounded p-8"
            >
              <p className="font-display italic text-heading-md text-[#F6F2EB] mb-6">
                &ldquo;{r.quote}&rdquo;
              </p>
              <span className="text-body-sm text-[#8A8A8A]">— {r.author}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
