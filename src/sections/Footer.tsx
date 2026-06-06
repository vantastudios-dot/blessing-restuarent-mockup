import { Link } from "react-router";
import { Instagram, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0A0A0A] border-t border-[#F6F2EB]/15">
      <div className="max-w-[1400px] mx-auto section-padding py-20">
        {/* Top Row */}
        <div className="text-center mb-16">
          <h3 className="font-display text-[28px] uppercase tracking-[0.15em] text-[#F6F2EB] mb-3">
            BLESSINGS
          </h3>
          <p className="font-body text-body-sm text-[#8A8A8A]">
            Restaurant &bull; Cafe &bull; Bakery &bull; Banquet Hall &bull; Private Dining &bull; Marriage Lawn
          </p>
        </div>

        {/* Middle Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          {/* Hours */}
          <div className="text-center md:text-left">
            <span className="text-label text-[#C7A878] block mb-4">HOURS</span>
            <p className="font-body text-body-sm text-[#F6F2EB]">
              Mon &ndash; Sun: 11:00 AM &ndash; 11:00 PM
            </p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-left">
            <span className="text-label text-[#C7A878] block mb-4">CONTACT</span>
            <p className="font-body text-body-sm text-[#F6F2EB] mb-1">
              +91 70078 38714
            </p>
            <p className="font-body text-body-sm text-[#8A8A8A]">
              blessingsrestaurantdeoria@gmail.com
            </p>
          </div>

          {/* Social */}
          <div className="text-center md:text-left">
            <span className="text-label text-[#C7A878] block mb-4">FOLLOW</span>
            <div className="flex items-center justify-center md:justify-start gap-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F6F2EB] hover:text-[#C7A878] transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#F6F2EB] hover:text-[#C7A878] transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <Link to="/" className="text-body-sm text-[#8A8A8A] hover:text-[#C7A878] transition-colors">
            Home
          </Link>
          <Link to="/guestbook" className="text-body-sm text-[#8A8A8A] hover:text-[#C7A878] transition-colors">
            Guestbook
          </Link>
          <button
            onClick={() => document.querySelector("#reservation")?.scrollIntoView({ behavior: "smooth" })}
            className="text-body-sm text-[#8A8A8A] hover:text-[#C7A878] transition-colors"
          >
            Reserve
          </button>
          <button
            onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            className="text-body-sm text-[#8A8A8A] hover:text-[#C7A878] transition-colors"
          >
            Contact
          </button>
        </div>

        {/* Bottom Row */}
        <div className="text-center border-t border-[#1A1A1A] pt-8">
          <p className="font-body text-body-sm text-[#8A8A8A]">
            &copy; 2025 Blessings. All rights reserved.
          </p>
          <p className="font-body text-body-sm text-[#8A8A8A] mt-1">
            Deoria, Uttar Pradesh, India.
          </p>
        </div>
      </div>
    </footer>
  );
}
