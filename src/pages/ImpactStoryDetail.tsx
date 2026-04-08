import { useEffect, useMemo, useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, MapPin } from "lucide-react";
import { api } from "@/lib/api";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { SeoConfig, truncateForMetaDescription } from "@/lib/seo";

interface ImpactStory {
  id: string;
  title: string;
  category: string;
  location: string;
  impact: string;
  description: string;
  image: string;
  published?: boolean;
  createdAt?: string;
  metrics?: { label: string; value: string }[];
}

const ImpactStoryDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [story, setStory] = useState<ImpactStory | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const load = async () => {
      try {
        setLoading(true);
        const response = await api.getImpactStory(id);
        if (response.success && response.data) {
          setStory(response.data);
        } else {
          setStory(null);
        }
      } catch {
        setStory(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const seo = useMemo((): Partial<SeoConfig> | undefined => {
    if (!story || story.published === false) return undefined;
    const descSource = [story.impact, story.description].filter(Boolean).join(" — ");
    let datePublished: string | undefined;
    if (story.createdAt) {
      const t = Date.parse(story.createdAt);
      if (!Number.isNaN(t)) datePublished = new Date(t).toISOString();
    }
    return {
      title: story.title,
      description: truncateForMetaDescription(descSource || story.title),
      image: story.image,
      type: "article",
      robots: "index,follow",
      datePublished,
    };
  }, [story]);

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading impact story...</div>
        </div>
      </Layout>
    );
  }

  if (!story || story.published === false) {
    return <Navigate to="/impact" replace />;
  }

  return (
    <Layout seo={seo}>
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={story.image}
            alt={story.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container-corporate relative z-10 pb-16">
          <Link
            to="/impact"
            className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All impact stories
          </Link>
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
            {story.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 max-w-4xl">
            {story.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            {story.location && (
              <span className="inline-flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {story.location}
              </span>
            )}
            {story.impact && (
              <span className="text-primary font-medium">{story.impact}</span>
            )}
          </div>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="max-w-3xl">
              <p className="text-muted-foreground leading-relaxed text-lg mb-10">
                {story.description}
              </p>
              {story.metrics && story.metrics.length > 0 && (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-8 border-t border-border">
                  {story.metrics.map((metric: { label: string; value: string }, index: number) => (
                    <div key={index}>
                      <div className="font-heading text-2xl text-primary mb-1">{metric.value}</div>
                      <div className="text-xs text-muted-foreground uppercase tracking-wide">
                        {metric.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <PageSidebar variant="general" showServices={false} />
          </div>
        </div>
      </section>

      <section className="py-24 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Amplify this work
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Partner with us on impact-aligned finance, or explore ways to support our mission.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact">
              <Button variant="hero">Start a conversation</Button>
            </Link>
            <Link to="/donate">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                Donate &amp; partner
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ImpactStoryDetail;
