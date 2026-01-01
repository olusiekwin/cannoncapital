import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";
import { PageSidebar } from "@/components/services/ServicesSidebar";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { Heart, Eye } from "lucide-react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await api.subscribeNewsletter(email);
      if (response.success) {
        toast({
          title: "Subscribed!",
          description: "Thank you for subscribing to our newsletter.",
        });
        setEmail("");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to subscribe. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 bg-transparent border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200"
      />
      <button
        type="submit"
        disabled={submitting}
        className="px-8 py-3 bg-primary text-primary-foreground text-sm font-body uppercase tracking-wide hover:bg-gold-muted transition-colors duration-200 disabled:opacity-50"
      >
        {submitting ? "Subscribing..." : "Subscribe"}
      </button>
    </form>
  );
}

const Insights = () => {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadArticles();
  }, []);

  const loadArticles = async () => {
    try {
      setLoading(true);
      const response = await api.getPublishedArticles();
      if (response.success && response.data) {
        setArticles(response.data);
      }
    } catch (error) {
      console.error('Error loading articles:', error);
      // Fallback to empty array if API fails
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading insights...</div>
        </div>
      </Layout>
    );
  }

  if (articles.length === 0) {
    return (
      <Layout>
        <AnimatedHero
          label="Insights"
          title="Perspectives on Wealth & Markets"
          subtitle="Timely analysis and strategic insights from our advisory team."
          backgroundImage="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
        />
        <section className="section-padding">
          <div className="container-corporate text-center">
            <p className="text-muted-foreground">No articles available yet. Check back soon!</p>
          </div>
        </section>
      </Layout>
    );
  }

  const featuredArticle = articles[0];
  const otherArticles = articles.slice(1);
  return (
    <Layout>
      {/* Hero */}
      <AnimatedHero
        label="Insights"
        title="Perspectives on Wealth & Markets"
        subtitle="Timely analysis and strategic insights from our advisory team, addressing the issues that matter most to discerning investors."
        backgroundImage="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Featured Article */}
      {featuredArticle && (
      <section className="border-b border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="aspect-[4/3] lg:aspect-auto overflow-hidden">
            <img
                src={featuredArticle.heroImage}
                alt={featuredArticle.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-8 lg:p-16 flex flex-col justify-center bg-charcoal">
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-body uppercase tracking-[0.2em] text-primary">
                  {featuredArticle.category}
              </span>
              <span className="text-xs text-muted-foreground">
                  {featuredArticle.date}
              </span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
                {featuredArticle.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
                {featuredArticle.excerpt}
            </p>
            <div className="flex items-center gap-6 mb-6">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Heart className="w-4 h-4 text-primary" strokeWidth={1.5} />
                  <span>{featuredArticle.likes || 0}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Eye className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                  <span>{(featuredArticle.views || 0).toLocaleString()}</span>
              </div>
            </div>
            <Link 
                to={`/insights/${featuredArticle.slug}`}
              className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-primary hover:text-gold-muted transition-colors duration-200"
            >
              Read Article
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>
      )}

      {/* Article Grid */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="min-w-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
            {otherArticles.map((article, index) => {
              const articleLink = article.slug ? `/insights/${article.slug}` : "#";
              return (
                <article 
                  key={article.id || article.slug || index}
                  className={`group cursor-pointer border-b border-border ${
                    index % 3 !== 2 ? "lg:border-r" : ""
                  } ${index % 2 === 0 ? "md:border-r lg:border-r-0" : ""} ${
                    index < 2 ? "lg:border-r" : ""
                  }`}
                >
                  <Link to={articleLink}>
                    <div className="aspect-[16/9] overflow-hidden">
                      <img
                        src={article.heroImage}
                        alt={article.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6 lg:p-8">
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-xs font-body uppercase tracking-[0.2em] text-primary">
                          {article.category}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {article.date}
                        </span>
                      </div>
                      <h3 className="font-heading text-lg text-foreground mb-3 group-hover:text-primary transition-colors duration-200 break-words line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-3 break-words">
                        {article.excerpt}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Heart className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                          <span>{article.likes || 0}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Eye className="w-3.5 h-3.5" strokeWidth={1.5} />
                          <span>{(article.views || 0).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </article>
              );
            })}
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <PageSidebar variant="insights" />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-charcoal border-t border-border">
        <div className="container-corporate">
          <div className="max-w-xl mx-auto text-center">
            <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
              Stay Informed
            </span>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
              Subscribe to Our Quarterly Review
            </h2>
            <p className="text-muted-foreground mb-8">
              Receive our market commentary and strategic insights directly 
              in your inbox.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Insights;
