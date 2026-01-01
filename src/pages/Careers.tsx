import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { MapPin, Clock, ArrowRight } from "lucide-react";
import { api } from "@/lib/api";

const values = [
  {
    title: "Client First",
    description: "Every decision we make is guided by what's best for our clients. Their success is our success."
  },
  {
    title: "Intellectual Rigor",
    description: "We approach every challenge with analytical discipline and a commitment to understanding complexity."
  },
  {
    title: "Collaborative Excellence",
    description: "Great outcomes emerge from diverse perspectives working together toward shared objectives."
  },
  {
    title: "Long-Term Orientation",
    description: "We build relationships and make decisions with multi-generational time horizons in mind."
  },
];

const Careers = () => {
  const [careers, setCareers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCareers = async () => {
      try {
        setLoading(true);
        const response = await api.getPublishedCareers();
        if (response.success && response.data) {
          setCareers(response.data);
        }
      } catch (error) {
        console.error('Failed to load careers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCareers();
  }, []);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Canon Capital Partners LLC office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/30" />
        </div>
        <div className="container-corporate relative z-10 pb-16">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Careers
          </span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
            Build Your Career at Canon Capital Partners LLC
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Join a team of exceptional professionals dedicated to delivering 
            institutional-grade advice to discerning clients around the world.
          </p>
        </div>
      </section>

      {/* Culture */}
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
                Our Culture
              </span>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Excellence Through Collaboration
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                At Canon Capital Partners LLC, we've built a culture that attracts and retains exceptional 
                talent. Our environment combines the intellectual stimulation of complex 
                problem-solving with the satisfaction of meaningful client impact.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We value diverse perspectives, encourage entrepreneurial thinking, and 
                invest heavily in professional development. Our flat organizational 
                structure ensures that good ideas are heard regardless of seniority.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value) => (
                <div key={value.title} className="border border-border p-6">
                  <h3 className="font-heading text-lg text-foreground mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="section-padding bg-charcoal">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
            Opportunities
          </span>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12">
            Open Positions
          </h2>
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading positions...
            </div>
          ) : careers.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No open positions at this time. Please check back later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {careers.map((position) => (
                <div 
                  key={position.id}
                  className="group bg-white border border-border hover:shadow-lg transition-all duration-300 p-6 lg:p-8 flex flex-col h-full"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                        {position.title}
                      </h3>
                      <span className="text-sm text-primary">{position.department}</span>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200 flex-shrink-0" />
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-6 line-clamp-3 flex-grow">
                    {position.description}
                  </p>
                  
                  <div className="flex flex-col gap-3 pt-4 border-t border-border">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 flex-shrink-0" />
                      <span className="break-words">{position.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      <span>{position.type}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
            </div>

            {/* Sidebar */}
            <PageSidebar variant="general" showServices={false} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Don't See the Right Fit?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            We're always interested in connecting with exceptional professionals. 
            Submit your resume for future consideration.
          </p>
          <Link to="/contact">
            <Button variant="hero">
              Submit Your Resume
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Careers;
