const services = [
  "RESTAURANT",
  "CAFE",
  "BAKERY",
  "BANQUET HALL",
  "PRIVATE DINING",
  "MARRIAGE LAWN",
];

export default function Services() {
  const allServices = [...services, ...services, ...services];

  return (
    <section className="relative bg-[#0A0A0A] border-y border-[#1A1A1A] py-6 overflow-hidden">
      <div className="animate-marquee flex items-center gap-8 whitespace-nowrap w-max hover:[animation-play-state:paused]">
        {allServices.map((service, i) => (
          <div key={i} className="flex items-center gap-8">
            <span
              className={`font-display text-heading-md uppercase transition-colors duration-300 hover:text-[#C7A878] cursor-default ${
                i % 2 === 0 ? "text-[#F6F2EB]" : "text-[#8A8A8A]"
              }`}
            >
              {service}
            </span>
            <span
              className="w-1.5 h-1.5 rotate-45 flex-shrink-0"
              style={{ backgroundColor: "#C7A878" }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
