import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { api } from "@/lib/api";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const ServiceDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadService();
    }
  }, [slug]);

  const loadService = async () => {
    try {
      setLoading(true);
      const response = await api.getService(slug!);
      if (response.success && response.data) {
        setService(response.data);
      }
    } catch (error) {
      console.error('Error loading service:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading service...</div>
        </div>
      </Layout>
    );
  }

  if (!service) {
    return <Navigate to="/services" replace />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={service.heroImage} 
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container-corporate relative z-10 pb-16">
          <Link 
            to="/services" 
            className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Services
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 max-w-4xl">
            {service.title}
          </h1>
          {service.subtitle && (
            <p className="text-lg text-primary mb-6">{service.subtitle}</p>
          )}
          <p className="text-muted-foreground max-w-2xl leading-relaxed">
            {service.description}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <article className="lg:col-span-8">
              {service.overview && (
                <div className="prose prose-lg max-w-none mb-12">
                  <h2 className="font-heading text-2xl text-foreground mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.overview}
                  </p>
                </div>
              )}

              {service.capabilities && service.capabilities.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-2xl text-foreground mb-6">Capabilities</h2>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {service.capabilities.map((capability: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground leading-relaxed">{capability}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {service.approach && service.approach.length > 0 && (
                <div className="mb-12">
                  <h2 className="font-heading text-2xl text-foreground mb-6">Our Approach</h2>
                  <div className="space-y-6">
                    {service.approach.map((step: any, index: number) => (
                      <div key={index} className="border-l-2 border-primary pl-6">
                        <h3 className="font-heading text-lg text-foreground mb-2">
                          {step.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {step.description}
                        </p>
              </div>
            ))}
          </div>
        </div>
              )}

              {service.stats && service.stats.length > 0 && (
                <div>
                  <h2 className="font-heading text-2xl text-foreground mb-6">Key Statistics</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {service.stats.map((stat: any, index: number) => (
                      <div key={index} className="border border-border p-6 text-center">
                        <div className="font-heading text-3xl text-primary mb-2">
                          {stat.value}
            </div>
                        <div className="text-sm text-muted-foreground">
                          {stat.label}
          </div>
              </div>
            ))}
          </div>
        </div>
              )}
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="border border-border p-6 sticky top-32">
                <h3 className="font-heading text-lg text-foreground mb-4">Service Information</h3>
                <div className="space-y-4 text-sm">
                  <div>
                    <span className="text-muted-foreground block mb-1">Service</span>
                    <span className="text-foreground">{service.title}</span>
                  </div>
                  {service.subtitle && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Category</span>
                      <span className="text-foreground">{service.subtitle}</span>
                    </div>
                  )}
                </div>
              </div>
            </aside>
            </div>

            {/* Sidebar */}
            <PageSidebar variant="services" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Our advisory team is prepared to understand your unique circumstances 
            and develop a tailored strategy.
          </p>
          <Link to="/contact">
            <Button variant="hero">Schedule Consultation</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ServiceDetail;
