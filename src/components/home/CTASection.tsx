import { CheckCircle, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const assurances = [
  "Global Investor Network Access",
  "Expert Project Finance Advisory",
  "Structured Financial Solutions",
  "ESG-Aligned Financing Strategies",
];

export function CTASection() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1800&auto=format&fit=crop",
  ];

  // Auto-rotate images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="relative bg-white mb-12 lg:mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {/* Left - Animated Image */}
        <div className="relative h-[300px] sm:h-[350px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <div className="absolute inset-0">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="Financial advisory and project finance consultation"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-in-out ${
                  idx === currentImageIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>
          {/* Carousel indicator dots */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImageIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentImageIndex ? "bg-white w-8" : "bg-white/50 w-1.5"
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Right - Content */}
        <div className="relative bg-[#111111] p-8 sm:p-10 lg:p-12 xl:p-14 flex flex-col justify-center">
          <div className="space-y-5 sm:space-y-6 lg:space-y-7">
            <div className="space-y-3 sm:space-y-4">
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary">
                Ready to Mobilize Capital?
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
                Let Us Connect Your Project with Strategic Capital
              </h2>
              <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                Whether you're developing infrastructure, launching energy projects, or expanding operations, 
                we're here to structure innovative financial solutions that drive sustainable growth.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-3">
              {assurances.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" strokeWidth={2} />
                  <span className="text-white/90 text-sm">{item}</span>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 uppercase tracking-[0.2em] text-sm font-semibold transition-all duration-300 hover:bg-primary/90"
              >
                Schedule Consultation
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/contact"
                className="group inline-flex items-center justify-center gap-2 border border-white/30 text-white px-8 py-4 uppercase tracking-[0.2em] text-sm font-semibold transition-all duration-300 hover:border-primary hover:text-primary"
              >
                Contact Us
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
