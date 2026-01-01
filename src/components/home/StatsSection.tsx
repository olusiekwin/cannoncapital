const stats = [
  { value: "$4.2B+", label: "Assets Under Advisory" },
  { value: "5+", label: "Years of Excellence" },
  { value: "850+", label: "Client Relationships" },
  { value: "12", label: "Global Offices" },
];

export function StatsSection() {
  return (
    <section className="border-t border-b border-gray-800 bg-[#111111]">
      <div className="container-corporate">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`py-8 sm:py-10 md:py-12 lg:py-14 text-center ${
                index < 3 ? "border-r border-gray-800" : ""
              } ${index < 2 ? "border-b lg:border-b-0 border-gray-800" : ""}`}
            >
              <div className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xs font-body uppercase tracking-[0.2em] text-white/80 px-2">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
