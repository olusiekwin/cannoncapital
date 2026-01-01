import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

const Services = () => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      const response = await api.getServices();
      if (response.success && response.data) {
        setServices(response.data);
      }
    } catch (error) {
      console.error('Error loading services:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading services...</div>
        </div>
      </Layout>
    );
  }
  return (
    <Layout>
      {/* Hero */}
      <AnimatedHero
        label="Our Services"
        title="Comprehensive Financial Solutions"
        subtitle="End-to-end financial solutions empowering governments, corporations, and project sponsors to secure the right capital for transformative initiatives."
        backgroundImage="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Services Grid with Sidebar */}
      <section className="section-padding bg-white">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            {/* Main Content */}
            <div className="min-w-0">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {services.map((service: any, index: number) => {
                  const serviceId = service.slug || service.title.toLowerCase().replace(/\s+/g, '-').replace(/&/g, '').replace(/\//g, '-');
                  return (
                    <Link
                      key={service.id || index}
                      to={`/services/${service.slug}`}
                      id={serviceId}
                      className="group bg-white border border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                    >
                      {/* Service Image */}
                      {service.heroImage && (
                        <div className="aspect-[16/10] overflow-hidden">
                          <img
                            src={service.heroImage}
                            alt={service.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}
                      
                      {/* Content */}
                      <div className="p-6 lg:p-8 flex flex-col flex-grow">
                        <div className="flex items-center justify-between mb-4">
                          <span className="text-xs font-body uppercase tracking-wide text-primary">
                            0{index + 1}
                          </span>
                          {service.icon && (
                            <div className="p-2 bg-muted/50 group-hover:bg-primary/10 transition-all duration-300">
                              <span className="text-xl">{service.icon}</span>
                            </div>
                          )}
                        </div>
                        
                        <h2 className="font-heading text-xl md:text-2xl text-foreground font-semibold mb-2 group-hover:text-primary transition-colors duration-300 break-words line-clamp-2">
                          {service.title}
                        </h2>
                        
                        {service.subtitle && (
                          <p className="text-primary text-sm mb-3 break-words">{service.subtitle}</p>
                        )}
                        
                        <p className="text-muted-foreground leading-relaxed text-sm mb-4 line-clamp-3 break-words flex-grow">
                          {service.description}
                        </p>

                        {/* Capabilities - Compact List */}
                        {service.capabilities && service.capabilities.length > 0 && (
                          <ul className="space-y-2 mb-4">
                            {service.capabilities.slice(0, 4).map((capability: string, detailIndex: number) => (
                              <li 
                                key={detailIndex}
                                className="flex items-start gap-2 text-xs text-muted-foreground"
                              >
                                <div className="w-1 h-1 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                                <span className="leading-relaxed break-words line-clamp-1">{capability}</span>
                              </li>
                            ))}
                            {service.capabilities.length > 4 && (
                              <li className="text-xs text-primary font-medium">
                                +{service.capabilities.length - 4} more
                              </li>
                            )}
                          </ul>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-border">
                          <span className="text-xs text-muted-foreground">Learn more</span>
                          <ArrowRight 
                            className="w-5 h-5 text-muted-foreground transition-all duration-300 group-hover:text-primary group-hover:translate-x-1" 
                            strokeWidth={1.5}
                          />
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
              {services.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No services available yet. Check back soon!
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <PageSidebar variant="services" />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-muted/30 border-t border-border">
        <div className="container-corporate text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold">
            Discuss Your Requirements
          </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
            Our advisory team is prepared to understand your unique circumstances 
            and develop a tailored strategy.
          </p>
            <div className="pt-4">
          <Link to="/contact">
                <Button variant="hero" className="group">
              Schedule Consultation
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
            </Button>
          </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Services;
