import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight, Building2, Layers, TrendingUp, DollarSign, Briefcase } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { api } from "@/lib/api";

// Icon mapping for services
const iconMap: Record<string, any> = {
  'Building2': Building2,
  'Layers': Layers,
  'TrendingUp': TrendingUp,
  'DollarSign': DollarSign,
  'Briefcase': Briefcase,
};

export function ServicesPreview() {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await api.getPublishedServices();
      if (response.success && response.data) {
        // Show only first 5 for preview
        setServices(response.data.slice(0, 5));
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-corporate text-center">
          <div className="text-muted-foreground">Loading services...</div>
        </div>
      </section>
    );
  }

  if (services.length === 0) {
    return null;
  }

  return (
    <section className="section-padding bg-white">
      <div className="container-corporate">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8 mb-12 sm:mb-16 lg:mb-18">
          <div className="max-w-2xl space-y-4 sm:space-y-5 md:space-y-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="h-[1px] w-8 sm:w-12 bg-primary" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
              EXPLORE OUR EXPERTISE
            </span>
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground leading-[1.1] font-semibold">
              End-to-End Financial Solutions
            </h2>
            <p className="text-muted-foreground max-w-xl text-sm sm:text-base leading-relaxed">
              Empowering governments, corporations, and project sponsors to secure the right capital for transformative initiatives
            </p>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-foreground text-white text-sm font-body uppercase tracking-[0.15em] hover:bg-foreground/90 transition-all duration-300 group"
          >
            View All Services
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>

        <div className="relative">
          {/* Carousel arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 w-12 h-12 lg:w-14 lg:h-14 border border-border bg-white flex items-center justify-center hover:bg-foreground hover:text-white hover:border-foreground transition-all duration-300 group shadow-sm"
            aria-label="Previous service"
          >
            <ChevronLeft className="w-5 h-5 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 w-12 h-12 lg:w-14 lg:h-14 border border-border bg-white flex items-center justify-center hover:bg-foreground hover:text-white hover:border-foreground transition-all duration-300 group shadow-sm"
            aria-label="Next service"
          >
            <ChevronRight className="w-5 h-5 text-foreground group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
          </button>

          {/* Services carousel */}
          <div className="overflow-hidden border border-border bg-white" ref={emblaRef}>
            <div className="flex">
              {services.map((service, index) => {
                const ServiceIcon = service.icon ? iconMap[service.icon] || Building2 : Building2;
                return (
                  <div
                    key={service.id}
                    className="group flex-[0_0_100%] md:flex-[0_0_50%] lg:flex-[0_0_33.333%] flex flex-col gap-4 sm:gap-5 md:gap-6 p-6 sm:p-8 lg:p-10 bg-white hover:bg-muted/30 transition-all duration-300 relative border border-border mr-4 md:mr-6 lg:mr-8 last:mr-0"
                  >
                    {/* Hover accent line */}
                    <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full" />
                    
                    <div className="flex items-start justify-between">
                      <div className="p-3 bg-muted/50 group-hover:bg-primary/10 transition-colors duration-300">
                        <ServiceIcon className="w-6 h-6 lg:w-7 lg:h-7 text-foreground group-hover:text-primary transition-colors duration-300" strokeWidth={1.5} />
                      </div>
                      <span className="text-xs font-body text-muted-foreground font-medium tracking-wider">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                      
                    <div className="space-y-4 flex-grow">
                      <h3 className="font-heading text-xl lg:text-2xl text-foreground font-semibold leading-tight group-hover:text-primary transition-colors duration-300">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed text-sm lg:text-base">
                        {service.description}
                      </p>
                    </div>
                      
                    <Link
                      to={`/services/${service.slug}`}
                      className="text-xs uppercase tracking-[0.2em] text-foreground flex items-center gap-2 hover:text-primary transition-all duration-300 mt-auto group/link font-medium"
                    >
                      <span>Read more</span>
                      <span className="text-base transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
