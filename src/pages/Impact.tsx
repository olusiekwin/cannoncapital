import { useEffect, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, TrendingUp, Users, Leaf, Building2 } from "lucide-react";
import { api } from "@/lib/api";

const impactCategories = [
  {
    icon: Building2,
    title: "Sustainable Housing",
    href: "#sustainable-housing",
  },
  {
    icon: Leaf,
    title: "Clean Energy",
    href: "#clean-energy",
  },
  {
    icon: Users,
    title: "Community Infrastructure",
    href: "#community-infrastructure",
  },
  {
    icon: TrendingUp,
    title: "ESG Initiatives",
    href: "#esg-initiatives",
  },
];

const Impact = () => {
  const location = useLocation();
  const [impactStories, setImpactStories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadImpactStories = async () => {
      try {
        setLoading(true);
        const response = await api.getPublishedImpactStories();
        if (response.success && response.data) {
          setImpactStories(response.data);
        }
      } catch (error) {
        console.error('Failed to load impact stories:', error);
      } finally {
        setLoading(false);
      }
    };

    loadImpactStories();
  }, []);

  useEffect(() => {
    // Handle anchor links on page load
    if (location.hash) {
      setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }, [location.hash, impactStories]);

  // Calculate category counts dynamically
  const categoryCounts = impactCategories.reduce((acc, category) => {
    const categoryKey = category.title.toLowerCase().replace(/\s+/g, '-');
    acc[categoryKey] = impactStories.filter(
      story => story.category.toLowerCase().replace(/\s+/g, '-') === categoryKey
    ).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <Layout>
      {/* Hero */}
      <AnimatedHero
        label="Our Impact"
        title="Creating Lasting Change Through Finance"
        subtitle="We measure success not just in returns, but in the positive transformation we enable in communities and the environment."
        backgroundImage="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Impact Categories */}
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
                  Impact Areas
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12">
                Where We Make a Difference
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {impactCategories.map((category) => (
                  <a
                    key={category.title}
                    href={category.href}
                    onClick={(e) => {
                      e.preventDefault();
                      const element = document.querySelector(category.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        window.history.pushState(null, '', category.href);
                      }
                    }}
                    className="group border border-border p-6 hover:bg-muted/30 transition-all duration-300 cursor-pointer"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <category.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                      <span className="text-sm text-muted-foreground">
                        {categoryCounts[category.title.toLowerCase().replace(/\s+/g, '-')] || 0} projects
                      </span>
                    </div>
                    <h3 className="font-heading text-xl text-foreground group-hover:text-primary transition-colors duration-300">
                      {category.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <PageSidebar variant="general" showServices={false} />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stories */}
      <section className="section-padding bg-muted/30">
        <div className="container-corporate">
          <div className="flex items-center gap-4 mb-12">
            <div className="h-[1px] w-12 bg-primary" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
              Impact Stories
            </span>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-16">
            Stories of Transformation
          </h2>
          
          {loading ? (
            <div className="text-center py-12 text-muted-foreground">
              Loading impact stories...
            </div>
          ) : impactStories.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              No impact stories available at this time.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {impactStories.map((story) => {
                const categoryId = story.category.toLowerCase().replace(/\s+/g, '-');
                return (
                  <div
                    key={story.id}
                    id={categoryId}
                    className="group bg-white border border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex flex-col flex-grow">
                      <div className="mb-4">
                        <span className="text-xs font-body uppercase tracking-[0.2em] text-primary mb-2 block">
                          {story.category}
                        </span>
                        <h3 className="font-heading text-xl md:text-2xl text-foreground mb-2 group-hover:text-primary transition-colors duration-300 line-clamp-2">
                          {story.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {story.location}
                        </p>
                        {story.impact && (
                          <p className="text-sm font-medium text-primary mb-3">
                            {story.impact}
                          </p>
                        )}
                        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3 mb-4 flex-grow">
                          {story.description}
                        </p>
                      </div>

                      {/* Impact Metrics */}
                      {story.metrics && story.metrics.length > 0 && (
                        <div className="grid grid-cols-3 gap-3 mb-4 pt-4 border-t border-border">
                          {story.metrics.slice(0, 3).map((metric: any, index: number) => (
                            <div key={index}>
                              <div className="font-heading text-xl text-primary mb-1">
                                {metric.value}
                              </div>
                              <div className="text-xs text-muted-foreground uppercase tracking-wide line-clamp-1">
                                {metric.label}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      <Link
                        to={`/impact/${story.id}`}
                        className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.2em] text-foreground hover:text-primary transition-colors duration-200 group/link mt-auto pt-4 border-t border-border"
                      >
                        Read Full Story
                        <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/link:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 lg:py-32 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground font-semibold">
              Partner With Us for Impact
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Let's work together to create meaningful change through strategic finance and sustainable development.
            </p>
            <div className="pt-4">
              <Link to="/contact">
                <Button variant="hero" className="group">
                  Discuss Your Impact Project
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

export default Impact;
