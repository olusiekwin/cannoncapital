import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { api } from "@/lib/api";

const Projects = () => {
  const [activeProjects, setActiveProjects] = useState<any[]>([]);
  const [completedProjects, setCompletedProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const [activeRes, completedRes] = await Promise.all([
        api.getActiveProjects(),
        api.getCompletedProjects(),
      ]);
      
      if (activeRes.success && activeRes.data) {
        setActiveProjects(activeRes.data);
      }
      if (completedRes.success && completedRes.data) {
        setCompletedProjects(completedRes.data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading projects...</div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <AnimatedHero
        label="Our Work"
        title="Projects & Case Studies"
        subtitle="A selection of representative engagements demonstrating our expertise across asset management, wealth protection, and financial structuring."
        backgroundImage="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Current Projects */}
      {activeProjects.length > 0 && (
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
                Current Engagements
              </span>
              <h2 className="font-heading text-3xl text-foreground">
                Active Projects
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0">
                  {activeProjects.map((project, index) => (
              <Link 
                key={project.id}
                to={`/projects/${project.id}`}
                className={`group border-t border-border ${index < 2 ? "lg:border-r" : ""}`}
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                          src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-body uppercase tracking-wide text-primary">
                      {project.category}
                    </span>
                    <span className="text-xs px-2 py-1 border border-primary text-primary">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-200 break-words line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 leading-relaxed line-clamp-3 break-words">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between">
                          {project.value && (
                    <span className="font-heading text-lg text-primary">{project.value}</span>
                          )}
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                </div>
              </Link>
            ))}
              </div>
            </div>
            
              {/* Sidebar */}
              <div className="lg:sticky lg:top-32 lg:h-fit">
                <PageSidebar variant="projects" />
              </div>
          </div>
        </div>
      </section>
      )}

      {/* Past Projects */}
      {completedProjects.length > 0 && (
      <section className="section-padding bg-charcoal">
        <div className="container-corporate">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
                Track Record
              </span>
              <h2 className="font-heading text-3xl text-foreground">
                Completed Engagements
              </h2>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {completedProjects.map((project, index) => {
                const firstOutcome = project.outcomes && project.outcomes.length > 0 
                  ? project.outcomes[0] 
                  : project.status;
                return (
              <Link 
                key={project.id}
                to={`/projects/${project.id}`}
                className="group bg-white border border-border hover:shadow-lg transition-all duration-300 flex flex-col h-full"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                        src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 lg:p-8 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-body uppercase tracking-wide text-primary break-words">
                      {project.category}
                    </span>
                    <span className="text-xs px-2 py-1 border border-primary text-primary">
                      {project.status}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl text-foreground mb-2 group-hover:text-primary transition-colors duration-200 break-words line-clamp-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 break-words flex-grow">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    {project.value && (
                      <span className="font-heading text-lg text-primary break-words">{project.value}</span>
                    )}
                    <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors duration-200" />
                  </div>
                </div>
              </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Empty State */}
      {activeProjects.length === 0 && completedProjects.length === 0 && (
        <section className="section-padding">
          <div className="container-corporate text-center">
            <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
        </div>
      </section>
      )}

      {/* CTA */}
      <section className="py-24 border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Discuss Your Project
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Every engagement begins with understanding your unique requirements. 
            Let's explore how we can support your objectives.
          </p>
          <Link to="/contact">
            <Button variant="hero">
              Start a Conversation
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
