import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { TestimonialsSection } from "@/components/testimonials/TestimonialsSection";
import { api } from "@/lib/api";

const values = [
  {
    title: "Integrity",
    description: "Unwavering commitment to ethical conduct and transparent client relationships.",
  },
  {
    title: "Excellence",
    description: "Pursuit of the highest standards in analysis, execution, and client service.",
  },
  {
    title: "Discretion",
    description: "Absolute confidentiality in all matters concerning our clients' affairs.",
  },
  {
    title: "Partnership",
    description: "Long-term alignment of interests with those we serve.",
  },
];

const About = () => {
  const location = useLocation();
  const [leadership, setLeadership] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStaff();
    // Handle anchor links on page load
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash]);

  const loadStaff = async () => {
    try {
      setLoading(true);
      const response = await api.getStaff(true); // published only
      if (response.success && response.data) {
        setLeadership(response.data);
      }
    } catch (error) {
      console.error('Error loading staff:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <AnimatedHero
        label="About Us"
        title="Built on Trust. Proven by Results."
        subtitle="Since 1998, Canon Capital Partners LLC has served discerning clients with institutional-grade advisory services, combining analytical rigor with personalized counsel."
        backgroundImage="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Mission & Vision */}
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="space-y-16">
              {/* Mission */}
              <div id="mission" className="max-w-3xl">
                <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
                  Our Mission
                </span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-relaxed">
                  "To provide clarity in complexity, protection in uncertainty, 
                  and growth through strategic discipline—serving as trusted 
                  stewards of our clients' financial futures."
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission drives every engagement. We combine institutional-grade expertise 
                  with personalized service, ensuring that each client receives solutions tailored 
                  to their unique circumstances and long-term objectives.
                </p>
              </div>

              {/* Vision */}
              <div id="vision" className="max-w-3xl">
                <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
                  Our Vision
                </span>
                <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl text-foreground mb-6 leading-relaxed">
                  "To be the most trusted financial advisory partner for governments, 
                  corporations, and project sponsors seeking transformative capital solutions."
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We envision a future where every viable project has access to the capital it needs 
                  to succeed. Through our global network, deep expertise, and commitment to excellence, 
                  we bridge the gap between opportunity and execution.
                </p>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <PageSidebar variant="about" showServices={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-charcoal border-b border-border">
        <div className="container-corporate">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Our Values
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-16">
            Principles That Guide Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className={`p-8 border-t border-border ${
                  index < 3 ? "lg:border-r" : ""
                } ${index < 2 ? "md:border-r" : ""}`}
              >
                <h3 className="font-heading text-xl text-foreground mb-4">
                  {value.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section id="leadership" className="section-padding border-b border-border">
        <div className="container-corporate">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Leadership
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-16">
            Executive Team
          </h2>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">Loading leadership...</div>
          ) : leadership.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((person) => (
                <div key={person.id} className="group">
                <h3 className="font-heading text-lg text-foreground mb-1">
                  {person.name}
                </h3>
                <p className="text-xs font-body uppercase tracking-wide text-primary mb-3">
                  {person.role}
                </p>
                <p className="text-sm text-muted-foreground">
                  {person.bio}
                </p>
              </div>
            ))}
          </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">No leadership information available.</div>
          )}
        </div>
      </section>

      {/* Video Section */}
      <section id="video" className="section-padding bg-charcoal border-b border-border">
        <div className="container-corporate">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
                Our Story
              </span>
            </div>
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
              Watch Our Story
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">
              Discover how Canon Capital Partners LLC has been transforming the financial landscape 
              through innovative solutions and trusted partnerships since 1998.
            </p>
            <div className="aspect-video bg-black border border-border overflow-hidden">
              <video
                className="w-full h-full object-cover"
                controls
                poster="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2070&auto=format&fit=crop"
              >
                <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
                Global Reach
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Serving Clients Worldwide
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                With offices across major financial centers, Canon Capital Partners LLC provides 
                seamless advisory services regardless of geographic complexity. 
                Our global infrastructure enables sophisticated cross-border 
                solutions while maintaining local market expertise.
              </p>
              <div className="grid grid-cols-3 gap-6 text-center">
                <div className="border-t border-border pt-4">
                  <div className="font-heading text-2xl text-primary mb-1">12</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Offices</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="font-heading text-2xl text-primary mb-1">40+</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Countries</div>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="font-heading text-2xl text-primary mb-1">6</div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">Continents</div>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              {["New York", "London", "Singapore", "Hong Kong", "Zurich", "Sydney", "Tokyo", "Frankfurt", "São Paulo", "Toronto", "Geneva", "Nairobi"].map((city) => (
                <span 
                  key={city}
                  className="px-4 py-2 border border-border hover:border-primary hover:text-primary transition-colors duration-200"
                >
                  {city}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection />

      {/* CTA / Get In Touch */}
      <section className="py-24 lg:py-32 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Begin the Conversation
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We welcome the opportunity to understand your unique circumstances 
            and explore how we might serve you.
          </p>
          <Link to="/contact">
            <Button variant="hero">
              Contact Us
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default About;
