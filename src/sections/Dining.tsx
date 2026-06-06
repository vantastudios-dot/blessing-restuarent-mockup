import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Dining() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const groups = gsap.utils.toArray<HTMLElement>(".fade-up-group");
      
      groups.forEach((group) => {
        const elements = group.querySelectorAll(".fade-up");
        gsap.fromTo(
          elements,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: group,
              start: "top 75%",
            },
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section id="dining" ref={sectionRef} className="relative bg-[#0A0A0A]">
      {/* RESTAURANT SECTION */}
      <div className="w-full flex flex-col md:flex-row min-h-[80vh] border-b border-[#1A1A1A]">
        {/* Left - Image (60%) */}
        <div className="w-full md:w-[60%] relative h-[50vh] md:h-auto">
          <img
            src="/images/restaurant_interior_luxury.png"
            alt="Luxury Restaurant Interior"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Right - Text (40%) */}
        <div className="fade-up-group w-full md:w-[40%] flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-[#0A0A0A]">
          <span className="text-label text-[#C7A878] font-accent mb-4 fade-up">(01)</span>
          <h2 className="font-display text-display-md uppercase text-[#F6F2EB] mb-6 fade-up">
            RESTAURANT
          </h2>
          <p className="font-body text-body-lg text-[#F6F2EB]/80 mb-8 fade-up italic">
            Fine Dining in an atmosphere of timeless elegance.
          </p>
          <ul className="space-y-4 mb-10 fade-up">
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Award-winning cuisine
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Intimate ambiance
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Private and group dining
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Reservations available
            </li>
          </ul>
          <div className="fade-up">
            <button className="px-8 py-4 bg-[#C7A878] text-[#0A0A0A] font-display uppercase tracking-wider text-sm hover:bg-[#F6F2EB] transition-colors duration-300">
              RESERVE TABLE
            </button>
          </div>
        </div>
      </div>

      {/* BAKERY SECTION */}
      <div className="w-full flex flex-col md:flex-row min-h-[80vh] border-b border-[#1A1A1A]">
        {/* Left - Text (40%) - Desktop, Top on Mobile */}
        <div className="fade-up-group w-full md:w-[40%] flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-[#0A0A0A] order-2 md:order-1">
          <span className="text-label text-[#C7A878] font-accent mb-4 fade-up">(02)</span>
          <h2 className="font-display text-display-md uppercase text-[#F6F2EB] mb-6 fade-up">
            BAKERY
          </h2>
          <p className="font-body text-body-lg text-[#F6F2EB]/80 mb-8 fade-up italic">
            Artisanal Creations, Daily Freshness
          </p>
          <ul className="space-y-4 mb-10 fade-up">
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Freshly baked every morning
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Signature cakes & pastries
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Custom orders available
            </li>
          </ul>
          <div className="fade-up">
            <button className="px-8 py-4 bg-[#C7A878] text-[#0A0A0A] font-display uppercase tracking-wider text-sm hover:bg-[#F6F2EB] transition-colors duration-300">
              EXPLORE MENU
            </button>
          </div>
        </div>
        {/* Right - Image (60%) */}
        <div className="w-full md:w-[60%] relative h-[50vh] md:h-auto order-1 md:order-2">
          <img
            src="/images/bakery_pastry_luxury.png"
            alt="Artisanal Bakery Selection"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>

      {/* CAFE SECTION */}
      <div className="w-full flex flex-col md:flex-row min-h-[80vh]">
        {/* Left - Image (60%) */}
        <div className="w-full md:w-[60%] relative h-[50vh] md:h-auto">
          <img
            src="/images/cafe_coffee_luxury.png"
            alt="Luxury Cafe Setting"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Right - Text (40%) */}
        <div className="fade-up-group w-full md:w-[40%] flex flex-col justify-center p-12 md:p-16 lg:p-24 bg-[#0A0A0A]">
          <span className="text-label text-[#C7A878] font-accent mb-4 fade-up">(03)</span>
          <h2 className="font-display text-display-md uppercase text-[#F6F2EB] mb-6 fade-up">
            CAFE
          </h2>
          <p className="font-body text-body-lg text-[#F6F2EB]/80 mb-8 fade-up italic">
            Artisanal coffee, handcrafted with passion.
          </p>
          <ul className="space-y-4 mb-10 fade-up">
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Premium roasted beans
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Expert baristas
            </li>
            <li className="flex items-center text-[#8A8A8A] text-body-md">
              <span className="w-1.5 h-1.5 bg-[#C7A878] rotate-45 mr-4 flex-shrink-0" />
              Relaxing luxury environment
            </li>
          </ul>
          <div className="fade-up">
            <button className="px-8 py-4 bg-[#C7A878] text-[#0A0A0A] font-display uppercase tracking-wider text-sm hover:bg-[#F6F2EB] transition-colors duration-300">
              EXPLORE MENU
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
