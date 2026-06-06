import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Phone, MessageCircle, MapPin } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-left",
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );

      gsap.fromTo(
        ".contact-right",
        { x: 30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative bg-[#0A0A0A] section-padding"
      style={{ paddingTop: "120px", paddingBottom: "120px" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left Column */}
          <div className="contact-left">
            <span className="text-label text-[#C7A878] font-accent block mb-4">
              (FIND US)
            </span>

            <h2 className="font-display text-display-sm uppercase text-[#F6F2EB] mb-10">
              Visit Blessings.
            </h2>

            <div className="space-y-5 mb-10">
              <p className="font-body text-body-lg text-[#F6F2EB]">
                Blessings Restaurant
              </p>
              <p className="font-body text-body-md text-[#8A8A8A]">
                Ramnath Chatni Gadhai
              </p>
              <p className="font-body text-body-md text-[#8A8A8A]">
                Deoria, Uttar Pradesh
              </p>
              <p className="font-body text-body-md text-[#8A8A8A]">
                India — 274001
              </p>
            </div>

            <p className="font-body text-body-lg text-[#C7A878] mb-8">
              +91 70078 38714
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="tel:+917007838714"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#C7A878] text-[#F6F2EB] text-sm hover:bg-[#C7A878] hover:text-[#0A0A0A] transition-all"
              >
                <Phone size={16} />
                Call Now
              </a>
              <a
                href="https://wa.me/917007838714"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F6F2EB]/30 text-[#F6F2EB] text-sm hover:bg-[#F6F2EB] hover:text-[#0A0A0A] transition-all"
              >
                <MessageCircle size={16} />
                WhatsApp
              </a>
              <a
                href="https://www.google.com/maps/search/Blessings+Restaurant+Deoria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-[#F6F2EB]/30 text-[#F6F2EB] text-sm hover:bg-[#F6F2EB] hover:text-[#0A0A0A] transition-all"
              >
                <MapPin size={16} />
                Directions
              </a>
            </div>
          </div>

          {/* Right Column - Map */}
          <div className="contact-right">
            <div
              className="w-full h-[400px] rounded overflow-hidden"
              style={{ border: "1px solid rgba(199,168,120,0.2)" }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.5!2d83.7816!3d26.5017!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDMwJzA2LjEiTiA4M8KwNDYnNTMuOCJF!5e0!3m2!1sen!2sin!4v1"
                width="100%"
                height="100%"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Blessings Restaurant Location"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
