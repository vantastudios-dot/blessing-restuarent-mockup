import Navigation from "@/sections/Navigation";
import Hero from "@/sections/Hero";
import Experience from "@/sections/Experience";
import Gallery from "@/sections/Gallery";
import About from "@/sections/About";
import Dining from "@/sections/Dining";
import Menu from "@/sections/Menu";
import FoodShowcase from "@/sections/FoodShowcase";
import Celebrations from "@/sections/Celebrations";
import Banquet from "@/sections/Banquet";
import Services from "@/sections/Services";
import Reservation from "@/sections/Reservation";
import Contact from "@/sections/Contact";
import Footer from "@/sections/Footer";
import AIChat from "@/components/AIChat";

export default function Home() {
  return (
    <div className="bg-[#0A0A0A] min-h-screen">
      <Navigation />
      <Hero />
      <Experience />
      <Gallery />
      <About />
      <Dining />
      <Menu />
      <FoodShowcase />
      <Celebrations />
      <Banquet />
      <Services />
      <Reservation />
      <Contact />
      <Footer />
      <AIChat />
    </div>
  );
}
