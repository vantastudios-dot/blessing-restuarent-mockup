import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const features = [
  "Wedding Functions",
  "Engagement Ceremonies",
  "Corporate Events",
  "Family Gatherings",
];

export default function Banquet() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".banquet-image",
        { clipPath: "inset(0 100% 0 0)" },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 1.2,
          ease: "power3.inOut",
          scrollTrigger: { trigger: section, start: "top 60%" },
        }
      );

      gsap.fromTo(
        ".banquet-content > *",
        { x: 40, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: { trigger: ".banquet-content", start: "top 70%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="banquet"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] section-padding"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center">
          {/* Image - 60% */}
          <div className="lg:col-span-3">
            <div className="banquet-image relative">
              <img
                src="/images/wedding-stage.jpg"
                alt="Wedding stage with floral decorations"
                className="w-full aspect-[16/10] object-cover rounded"
                style={{ boxShadow: "inset 0 0 0 1px rgba(199,168,120,0.2)" }}
              />
              <div
                className="absolute inset-4 pointer-events-none rounded"
                style={{ border: "1px solid rgba(199,168,120,0.15)" }}
              />
            </div>
          </div>

          {/* Content - 40% */}
          <div className="banquet-content lg:col-span-2">
            <span className="text-label text-[#C7A878] font-accent block mb-4">
              (BANQUET &amp; MARRIAGE LAWN)
            </span>

            <h2 className="font-display text-display-md uppercase text-[#F6F2EB] mb-6">
              Where Forever Begins.
            </h2>

            <p className="font-body text-body-md text-[#8A8A8A] mb-8">
              Our marriage lawn and banquet hall provide the perfect canvas for your dream
              wedding. With capacity for up to 500 guests, lush green surroundings, and
              impeccable service — your special day deserves nothing less.
            </p>

            <ul className="space-y-4 mb-8">
              {features.map((f, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span
                    className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
                    style={{ backgroundColor: "#C7A878" }}
                  />
                  <span className="font-body text-body-md text-[#F6F2EB]">{f}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={() => {
                const el = document.querySelector("#reservation");
                if (el) el.scrollIntoView({ behavior: "smooth" });
              }}
              className="btn-secondary"
            >
              Plan Your Event
            </button>
          </div>
        </div>

        {/* Marriage Lawn Section */}
        <div id="marriage" className="mt-24 pt-24 border-t border-[#1A1A1A]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <span className="text-label text-[#C7A878] font-accent block mb-4">
                (MARRIAGE LAWN)
              </span>
              <h2 className="font-display text-display-sm uppercase text-[#F6F2EB] mb-6">
                An Open-Air Paradise.
              </h2>
              <p className="font-body text-body-md text-[#8A8A8A] mb-8">
                Surrounded by lush greenery and adorned with fairy lights, our marriage lawn
                offers a magical setting for your outdoor celebrations. From the mandap to the
                dining area, every element is designed to create an unforgettable experience.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="text-center px-6 py-4 border border-[#1A1A1A] rounded">
                  <div className="font-display text-3xl text-[#C7A878]">500+</div>
                  <div className="text-label text-[#8A8A8A] mt-1">Guest Capacity</div>
                </div>
                <div className="text-center px-6 py-4 border border-[#1A1A1A] rounded">
                  <div className="font-display text-3xl text-[#C7A878]">2 Acre</div>
                  <div className="text-label text-[#8A8A8A] mt-1">Lawn Area</div>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="/images/marriage-lawn.jpg"
                alt="Marriage lawn with fairy lights"
                className="w-full aspect-video object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
