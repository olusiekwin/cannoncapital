import { useState, useEffect } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link, useParams, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, User, Clock, Share2, Heart, Eye } from "lucide-react";
import { ArticleReviews } from "@/components/reviews/ArticleReviews";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { PageSidebar } from "@/components/services/ServicesSidebar";

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
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email"
        className="flex-1 px-4 py-3 bg-transparent border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200"
      />
      <Button variant="hero" disabled={submitting}>
        {submitting ? "Subscribing..." : "Subscribe"}
      </Button>
    </form>
  );
}

const ArticleDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    if (slug) {
      loadArticle();
    }
  }, [slug]);

  const loadArticle = async () => {
    try {
      setLoading(true);
      const response = await api.getArticle(slug!);
      if (response.success && response.data) {
        setArticle(response.data);
        setLikesCount(response.data.likes || 0);
        // Check if already liked (using localStorage as simple check)
        const likedArticles = JSON.parse(localStorage.getItem('liked_articles') || '[]');
        setLiked(likedArticles.includes(slug));
      }
    } catch (error: any) {
      console.error('Error loading article:', error);
      toast({
        title: "Error",
        description: "Failed to load article",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    if (!slug) return;
    
    try {
      // Generate a simple user identifier
      let userId = localStorage.getItem('user_id');
      if (!userId) {
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        localStorage.setItem('user_id', userId);
      }

      const response = await api.likeArticle(slug, userId);
      if (response.success && response.data) {
        setLiked(response.data.liked);
        setLikesCount(response.data.likes);
        
        // Update localStorage
        const likedArticles = JSON.parse(localStorage.getItem('liked_articles') || '[]');
        if (response.data.liked && !likedArticles.includes(slug)) {
          likedArticles.push(slug);
        } else if (!response.data.liked) {
          const index = likedArticles.indexOf(slug);
          if (index > -1) likedArticles.splice(index, 1);
        }
        localStorage.setItem('liked_articles', JSON.stringify(likedArticles));
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to like article",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-muted-foreground">Loading article...</div>
        </div>
      </Layout>
    );
  }

  if (!article) {
    return <Navigate to="/insights" replace />;
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={article.heroImage} 
            alt={article.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background/50" />
        </div>
        <div className="container-corporate relative z-10 pb-16">
          <Link 
            to="/insights" 
            className="inline-flex items-center gap-2 text-sm font-body uppercase tracking-wide text-muted-foreground hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            All Insights
          </Link>
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-4 block">
            {article.category}
          </span>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-6 max-w-4xl">
            {article.title}
          </h1>
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {article.readTime}
            </div>
            <div className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              {article.views || 0} views
            </div>
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 transition-colors duration-200 ${
                liked ? 'text-red-500' : 'text-muted-foreground hover:text-red-500'
              }`}
            >
              <Heart className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} />
              {likesCount} likes
            </button>
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
                {article.content && article.content.map((paragraph: string, index: number) => (
                  <p key={index} className="text-muted-foreground leading-relaxed mb-6">
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* Share */}
              <div className="mt-8 pt-6 border-t border-border">
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-sm text-muted-foreground">Share this article:</span>
                  <button className="p-2 border border-border hover:border-primary hover:text-primary transition-colors duration-200">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Reviews */}
                {slug && <ArticleReviews articleSlug={slug} inline={true} />}
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              {/* Author */}
              <div className="border border-border p-6 mb-8">
                <span className="text-xs font-body uppercase tracking-wide text-muted-foreground mb-4 block">
                  Author
                </span>
                <h3 className="font-heading text-lg text-foreground mb-1">
                  {article.author}
                </h3>
                <p className="text-sm text-primary mb-4">{article.authorRole}</p>
                <p className="text-sm text-muted-foreground">
                  Canon Capital Partners LLC
                </p>
              </div>

              {/* Topics */}
              {article.relatedTopics && article.relatedTopics.length > 0 && (
              <div className="border border-border p-6">
                <span className="text-xs font-body uppercase tracking-wide text-muted-foreground mb-4 block">
                  Related Topics
                </span>
                <div className="flex flex-wrap gap-2">
                    {article.relatedTopics.map((topic: string) => (
                    <span 
                      key={topic}
                      className="px-3 py-1 border border-border text-sm text-foreground hover:border-primary hover:text-primary transition-colors duration-200 cursor-pointer"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
              )}
            </aside>
            </div>

            {/* Sidebar */}
            <PageSidebar variant="insights" />
          </div>
        </div>
      </section>

      {/* CTA / Newsletter Subscription */}
      <section className="py-24 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Subscribe to Our Insights
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Receive our market commentary and strategic insights directly in your inbox.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </Layout>
  );
};

export default ArticleDetail;
