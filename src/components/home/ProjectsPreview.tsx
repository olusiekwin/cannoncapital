import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { api } from "@/lib/api";

export function ProjectsPreview() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await api.getProjects();
      if (response.success && response.data) {
        setProjects(response.data);
      }
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories for filters
  const categories = Array.from(new Set(projects.map(p => p.category))).filter(Boolean);
  const filters = [
    { label: "All", count: projects.length, value: "all" },
    ...categories.map(cat => ({
      label: cat,
      count: projects.filter(p => p.category === cat).length,
      value: cat.toLowerCase().replace(/\s+/g, '-'),
    })),
  ];

  const filteredProjects = activeFilter === "all" 
    ? projects.slice(0, 5) // Show first 5 for "all"
    : projects.filter(p => 
        p.category?.toLowerCase().replace(/\s+/g, '-') === activeFilter
      ).slice(0, 5);

  const featuredProject = filteredProjects[0];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  if (loading) {
    return (
      <section className="section-padding">
        <div className="container-corporate text-center">
          <div className="text-muted-foreground">Loading projects...</div>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <section className="relative">
      {/* Header Section - Image Background */}
      <div className="relative text-white py-12 sm:py-16 md:py-20">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1800&auto=format&fit=crop')`,
          }}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/85" />
        <div className="relative z-10">
          <div className="container-corporate space-y-6 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4 text-center">
              <span className="text-xs font-body uppercase tracking-[0.3em] text-white/90">
                OUR FEATURED PROJECTS
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl leading-tight text-white">
                Selected Case Studies
              </h2>
              <p className="text-white/90 max-w-3xl mx-auto text-sm sm:text-base">
                Explore our portfolio of successful project finance and capital mobilization initiatives.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 text-sm uppercase tracking-[0.22em]">
              {filters.map((filter) => (
                <button
                  key={filter.value}
                  onClick={() => setActiveFilter(filter.value)}
                  className={`px-4 py-2 border transition-colors duration-150 ${
                    activeFilter === filter.value
                      ? "border-white text-white underline"
                      : "border-white/10 text-white/80 hover:text-white hover:border-white"
                  }`}
                >
                  {filter.label} <sup className="ml-1 text-white/50">{filter.count}</sup>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Featured Project Section */}
      {activeFilter === "all" ? (
        /* Cards Layout for "All" - Carousel */
        <div className="bg-white py-12 sm:py-16 md:py-20">
          <div className="container-corporate">
            <div className="relative">
              {/* Carousel arrows */}
              <button
                onClick={scrollPrev}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 w-10 h-10 lg:w-12 lg:h-12 border border-border bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </button>
              <button
                onClick={scrollNext}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 w-10 h-10 lg:w-12 lg:h-12 border border-border bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
                aria-label="Next project"
              >
                <ChevronRight className="w-5 h-5 text-foreground" strokeWidth={1.5} />
              </button>

              <div className="overflow-hidden" ref={emblaRef}>
                <div className="flex gap-8">
                  {filteredProjects.map((project) => (
                    <div key={project.id} className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] lg:flex-[0_0_calc(33.333%-1.33rem)] border border-border bg-white hover:shadow-lg transition-shadow duration-200">
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={project.heroImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6 space-y-4">
                        <div className="text-xs text-primary uppercase tracking-[0.2em]">
                          {project.category}
                        </div>
                        <h3 className="font-heading text-xl font-semibold text-foreground">
                          {project.title}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed text-sm line-clamp-3">
                          {project.description}
                        </p>
                        <Link
                          to={`/projects/${project.id}`}
                          className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200 uppercase tracking-[0.2em] text-xs"
                        >
                          Read More
                          <span>→</span>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Full Cover Layout for Specific Filters */
        <div className="relative min-h-[500px] sm:min-h-[600px] lg:min-h-[700px]">
          {/* Background Image - covers entire section */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-700 ease-in-out"
            style={{
              backgroundImage: `url(${featuredProject?.heroImage || 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1800&auto=format&fit=crop'})`,
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/80" />
          </div>

          {/* Content Overlay */}
          <div className="container-corporate relative z-10 h-full min-h-[500px] sm:min-h-[600px] lg:min-h-[700px] flex items-center py-12 sm:py-16 md:py-20">
            <div className="max-w-2xl text-white">
              <div className="text-xs sm:text-sm text-primary uppercase tracking-[0.2em] mb-3 sm:mb-4">
                {featuredProject?.category}
              </div>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-semibold mb-4 sm:mb-6 leading-tight">
                {featuredProject?.title}
              </h3>
              <p className="text-white/90 leading-relaxed text-base sm:text-lg mb-6 sm:mb-8">
                {featuredProject?.description}
              </p>
              <Link
                to={`/projects/${featuredProject?.id}`}
                className="inline-flex items-center gap-2 text-white hover:text-primary transition-colors duration-200 uppercase tracking-[0.2em] text-sm border border-white/30 px-6 py-3 hover:border-primary"
              >
                View Full Case Study
                <span className="text-xl">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
