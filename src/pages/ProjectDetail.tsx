import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Check } from "lucide-react";
import { api } from "@/lib/api";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [project, setProject] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadProject();
    }
  }, [id]);

  const loadProject = async () => {
    try {
      setLoading(true);
      const response = await api.getProject(id!);
      if (response.success && response.data) {
        setProject(response.data);
      }
    } catch (error) {
      console.error('Error loading project:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading project...</div>
        </div>
      </Layout>
    );
  }

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.heroImage} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container-corporate relative z-10 pb-16">
          <Link 
            to="/projects" 
            className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Projects
          </Link>
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
              {project.category}
            </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 max-w-4xl">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {project.value && (
              <span className="font-heading text-lg text-primary">{project.value}</span>
            )}
            {project.status && (
              <span className="px-3 py-1 border border-primary text-primary">
                {project.status}
              </span>
            )}
            {project.duration && <span>{project.duration}</span>}
            {project.location && <span>{project.location}</span>}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <article className="lg:col-span-8">
              <div className="prose prose-lg max-w-none">
                <div className="mb-8">
                  <h2 className="font-heading text-2xl text-foreground mb-4">Overview</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {project.description}
                  </p>
            </div>

                {project.challenge && (
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl text-foreground mb-4">Challenge</h2>
                    <p className="text-muted-foreground leading-relaxed">
                {project.challenge}
              </p>
            </div>
                )}

                {project.strategy && (
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl text-foreground mb-4">Strategy</h2>
                    <p className="text-muted-foreground leading-relaxed">
                {project.strategy}
              </p>
                  </div>
                )}

                {project.outcomes && project.outcomes.length > 0 && (
                  <div className="mb-8">
                    <h2 className="font-heading text-2xl text-foreground mb-4">Outcomes</h2>
                    <ul className="space-y-3">
                      {project.outcomes.map((outcome: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground leading-relaxed">{outcome}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {project.tools && project.tools.length > 0 && (
                  <div>
                    <h2 className="font-heading text-2xl text-foreground mb-4">Tools & Technologies</h2>
                    <div className="flex flex-wrap gap-2">
                      {project.tools.map((tool: string, index: number) => (
                        <span 
                          key={index}
                          className="px-4 py-2 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-200"
                        >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
                )}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="border border-border p-6 sticky top-32">
                <h3 className="font-heading text-lg text-foreground mb-4">Project Details</h3>
                <div className="space-y-4 text-sm">
                  {project.category && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Category</span>
                      <span className="text-foreground">{project.category}</span>
                    </div>
                  )}
                  {project.status && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Status</span>
                      <span className="text-foreground">{project.status}</span>
                    </div>
                  )}
                  {project.value && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Value</span>
                      <span className="text-primary font-heading">{project.value}</span>
                    </div>
                  )}
                  {project.duration && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Duration</span>
                      <span className="text-foreground">{project.duration}</span>
                    </div>
                  )}
                  {project.location && (
                    <div>
                      <span className="text-muted-foreground block mb-1">Location</span>
                      <span className="text-foreground">{project.location}</span>
          </div>
                  )}
        </div>
              </div>
            </aside>
            </div>

            {/* Sidebar */}
            <PageSidebar variant="projects" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Discuss Your Project
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Every engagement begins with understanding your unique requirements. 
            Let's explore how we can support your objectives.
          </p>
          <Link to="/contact">
            <Button variant="hero">Start a Conversation</Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default ProjectDetail;
