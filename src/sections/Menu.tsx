import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { trpc } from "@/providers/trpc";

gsap.registerPlugin(ScrollTrigger);

const categories = [
  { key: "chinese", label: "CHINESE", image: "/images/chilli-paneer.jpg" },
  { key: "tandoor", label: "TANDOOR", image: "/images/menu-starters.jpg" },
  { key: "thali", label: "THALI", image: "/images/menu-thalis.jpg" },
  { key: "bakery", label: "BAKERY", image: "/images/chocolate-cake.jpg" },
  { key: "cafe", label: "CAFE", image: "/images/coffee-art.jpg" },
  { key: "desserts", label: "DESSERTS", image: "/images/chocolate-cake.jpg" },
];

export default function Menu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState("chinese");

  const { data: menuItems } = trpc.menu.list.useQuery({ category: activeCategory as "chinese" | "tandoor" | "thali" | "bakery" | "cafe" | "desserts" });

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".menu-header",
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
        ".menu-category-btn",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: { trigger: ".menu-categories", start: "top 80%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const activeCatData = categories.find((c) => c.key === activeCategory);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] section-padding"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Header */}
        <div className="menu-header text-center mb-16">
          <span className="text-label text-[#C7A878] font-accent block mb-4">
            (OUR MENU)
          </span>
          <h2 className="font-display text-display-sm uppercase text-[#F6F2EB]">
            Signature Dishes
          </h2>
        </div>

        {/* Category Tabs */}
        <div className="menu-categories flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`menu-category-btn px-6 py-2 rounded-full border text-[13px] uppercase tracking-[0.1em] transition-all duration-300 font-body ${
                activeCategory === cat.key
                  ? "bg-[#C7A878] border-[#C7A878] text-[#0A0A0A]"
                  : "border-[#1A1A1A] text-[#8A8A8A] hover:border-[#C7A878] hover:text-[#C7A878]"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Featured Image */}
          <div className="relative">
            {activeCatData && (
              <img
                src={activeCatData.image}
                alt={activeCatData.label}
                className="w-full aspect-[4/3] object-cover rounded-lg"
              />
            )}
            <div className="absolute top-6 left-6 text-label text-[#C7A878] font-accent">
              ({activeCatData?.label})
            </div>
          </div>

          {/* Menu Items */}
          <div className="space-y-6">
            <h3 className="font-display text-heading-lg uppercase text-[#F6F2EB] mb-8">
              {activeCatData?.label}
            </h3>

            {menuItems && menuItems.length > 0 ? (
              menuItems.slice(0, 8).map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-start border-b border-[#1A1A1A] pb-4 group hover:border-[#C7A878]/30 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-body text-body-md text-[#F6F2EB] group-hover:text-[#C7A878] transition-colors">
                        {item.name}
                      </span>
                      {item.isSpecial && (
                        <span className="text-[10px] uppercase tracking-wider text-[#C7A878] bg-[#C7A878]/10 px-2 py-0.5 rounded">
                          Special
                        </span>
                      )}
                    </div>
                    {item.description && (
                      <p className="text-body-sm text-[#8A8A8A] mt-1 max-w-[400px]">
                        {item.description}
                      </p>
                    )}
                  </div>
                  <span className="font-display text-[#C7A878] text-lg ml-4">
                    Rs. {item.price}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-[#8A8A8A] text-body-md">
                Loading menu items...
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
