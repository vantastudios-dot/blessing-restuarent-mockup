import { useState, useEffect } from "react";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const navLinks = [
  { label: "Restaurant", href: "#dining" },
  { label: "Cafe", href: "#cafe" },
  { label: "Bakery", href: "#bakery" },
  { label: "Banquet", href: "#banquet" },
  { label: "Celebrations", href: "#celebrations" },
  { label: "Private Dining", href: "#private-dining" },
  { label: "Marriage Lawn", href: "#marriage" },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAdmin, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0A0A0A]/80 backdrop-blur-xl border-b border-[#1A1A1A]"
            : "bg-transparent"
        }`}
        style={{ height: 72 }}
      >
        <div className="flex items-center justify-between h-full section-padding max-w-[1400px] mx-auto">
          <Link
            to="/"
            className="font-display text-[20px] uppercase tracking-[0.15em] text-[#F6F2EB] hover:text-[#C7A878] transition-colors"
          >
            BLESSINGS
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => scrollTo(link.href)}
                className="text-[13px] uppercase tracking-[0.1em] text-[#8A8A8A] hover:text-[#C7A878] transition-colors duration-300 font-body"
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/guestbook"
              className="text-[13px] uppercase tracking-[0.1em] text-[#8A8A8A] hover:text-[#C7A878] transition-colors duration-300 font-body"
            >
              Guestbook
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-[13px] uppercase tracking-[0.1em] text-[#C7A878] hover:text-[#F6F2EB] transition-colors duration-300 font-body"
              >
                Dashboard
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-[12px] text-[#8A8A8A]">{user.name}</span>
                <button
                  onClick={logout}
                  className="text-[12px] uppercase tracking-[0.1em] text-[#8A8A8A] hover:text-[#C7A878] transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-5 py-2 rounded-full border border-[#C7A878] text-[#F6F2EB] text-[13px] uppercase tracking-[0.05em] hover:bg-[#C7A878] hover:text-[#0A0A0A] transition-all duration-300"
              >
                Reserve
              </Link>
            )}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-[#F6F2EB]"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0A0A0A] flex flex-col items-center justify-center gap-8">
          <button
            onClick={() => setMobileOpen(false)}
            className="absolute top-6 right-6 text-[#F6F2EB]"
          >
            <X size={24} />
          </button>
          {navLinks.map((link, i) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="font-display text-heading-lg text-[#F6F2EB] hover:text-[#C7A878] transition-colors"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/guestbook"
            onClick={() => setMobileOpen(false)}
            className="font-display text-heading-lg text-[#F6F2EB] hover:text-[#C7A878] transition-colors"
          >
            Guestbook
          </Link>
          {isAdmin && (
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="font-display text-heading-lg text-[#C7A878]"
            >
              Dashboard
            </Link>
          )}
          <div className="mt-8 flex flex-col gap-4 items-center">
            {user ? (
              <>
                <span className="text-[#8A8A8A] text-sm">{user.name}</span>
                <button
                  onClick={() => { setMobileOpen(false); logout(); }}
                  className="text-[#8A8A8A] text-sm uppercase tracking-wider"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="btn-primary"
              >
                Login / Reserve
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  );
}
