import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { api } from "@/lib/api";

export function InsightsPreview() {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await api.getPublishedArticles();
      if (response.success && response.data) {
        // Show only first 3 for preview
        setArticles(response.data.slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading articles:', error);
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
          <div className="text-muted-foreground">Loading insights...</div>
        </div>
      </section>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
      day: date.getDate().toString(),
      month: date.toLocaleString('en-US', { month: 'short' }),
    };
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-corporate">
        <div className="space-y-3 sm:space-y-4 text-center max-w-3xl mx-auto mb-10 sm:mb-12 md:mb-14">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-muted-foreground">
            READ OUR BLOG
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-foreground">
            Featured News and Insights
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            Read and update the latest news from us. Stay informed with our market commentary and strategic insights.
          </p>
          <div className="mx-auto h-[1px] w-12 bg-foreground" />
        </div>

        <div className="relative">
          {/* Carousel arrows */}
          <button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-8 z-10 w-10 h-10 lg:w-12 lg:h-12 border border-border bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            aria-label="Previous post"
          >
            <ChevronLeft className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>
          <button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-8 z-10 w-10 h-10 lg:w-12 lg:h-12 border border-border bg-white flex items-center justify-center hover:bg-gray-50 transition-colors duration-200"
            aria-label="Next post"
          >
            <ChevronRight className="w-5 h-5 text-foreground" strokeWidth={1.5} />
          </button>

          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-8">
              {articles.map((article, idx) => {
                const dateInfo = formatDate(article.date);
                return (
                  <article key={article.id} className="flex-[0_0_100%] lg:flex-[0_0_calc(33.333%-1.33rem)] border border-border bg-white">
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                      />
                      {/* Date overlay - bottom right */}
                      <div className="absolute bottom-0 right-0 bg-black text-white px-4 py-3 text-center">
                        <div className="text-2xl font-heading leading-none">{dateInfo.day}</div>
                        <div className="text-xs uppercase mt-1">{dateInfo.month}</div>
                      </div>
                      {/* Video play button for middle card */}
                      {idx === 1 && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 border-2 border-white bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Black author bar */}
                    <div className="bg-black text-white px-6 py-3 text-xs uppercase tracking-[0.2em]">
                      BY {article.author?.toUpperCase() || 'CANNON CAPITAL'}
                    </div>

                    <div className="p-6 space-y-4">
                      <h3 className="font-heading text-xl text-foreground font-semibold">{article.title}</h3>
                      <p className="text-muted-foreground leading-relaxed text-sm">
                        {article.excerpt}
                      </p>
                      <Link
                        to={`/insights/${article.slug}`}
                        className="text-sm uppercase tracking-[0.2em] inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors duration-200"
                      >
                        Continue Reading
                        <span className="text-base">→</span>
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
