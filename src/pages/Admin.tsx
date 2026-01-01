import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { ArticleForm } from "@/components/admin/ArticleForm";
import { StaffForm } from "@/components/admin/StaffForm";
import { ServiceForm } from "@/components/admin/ServiceForm";
import { ProjectForm } from "@/components/admin/ProjectForm";
import { TestimonialForm } from "@/components/admin/TestimonialForm";
import { ReviewForm } from "@/components/admin/ReviewForm";
import { CommentForm } from "@/components/admin/CommentForm";
import { CareerForm } from "@/components/admin/CareerForm";
import { NewsletterForm } from "@/components/admin/NewsletterForm";
import { ImpactForm } from "@/components/admin/ImpactForm";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Check, 
  X, 
  Star, 
  MessageSquare,
  Users,
  FileText,
  BookOpen,
  Briefcase,
  Building2,
  MessageCircle,
  Mail,
  LogOut,
  Eye,
  Heart,
  UserPlus,
  Send,
} from "lucide-react";

type TabType =
  | "articles"
  | "services"
  | "projects"
  | "impact"
  | "staff"
  | "careers"
  | "testimonials"
  | "reviews"
  | "comments"
  | "contact"
  | "newsletter";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>("articles");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  // Data states
  const [articles, setArticles] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [impactStories, setImpactStories] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [careers, setCareers] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [comments, setComments] = useState<any[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [newsletterSubscribers, setNewsletterSubscribers] = useState<any[]>([]);

  // Form states
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
    loadData();
    }
  }, [isAuthenticated, activeTab]);

  const checkAuth = async () => {
    try {
      const response = await api.verifyToken();
      if (response.success) {
        setIsAuthenticated(true);
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      switch (activeTab) {
        case "articles":
          const articlesRes = await api.getArticles(false);
          setArticles(articlesRes.data || []);
          break;
        case "services":
          const servicesRes = await api.getServices(false);
          setServices(servicesRes.data || []);
          break;
        case "projects":
          const projectsRes = await api.getProjects(false);
          setProjects(projectsRes.data || []);
          break;
        case "impact":
          const impactRes = await api.getImpactStories(false);
          setImpactStories(impactRes.data || []);
          break;
        case "staff":
          const staffRes = await api.getStaff(false);
          setStaff(staffRes.data || []);
          break;
        case "careers":
          const careersRes = await api.getCareers(false);
          setCareers(careersRes.data || []);
          break;
        case "testimonials":
          const testimonialsRes = await api.getTestimonials(false);
          setTestimonials(testimonialsRes.data || []);
          break;
        case "reviews":
          const reviewsRes = await api.getReviews(undefined, false);
          setReviews(reviewsRes.data || []);
          break;
        case "comments":
          const commentsRes = await api.getAllComments();
          setComments(commentsRes.data || []);
          break;
        case "contact":
          const contactRes = await api.getContactSubmissions();
          setContactSubmissions(contactRes.data || []);
          break;
        case "newsletter":
          const subscribersRes = await api.getNewsletterSubscribers();
          setNewsletterSubscribers(subscribersRes.data || []);
          break;
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to load data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (type: TabType, id: string) => {
    if (!confirm(`Are you sure you want to delete this item?`)) return;

    try {
      switch (type) {
        case "articles":
          await api.deleteArticle(id);
          break;
        case "services":
          await api.deleteService(id);
          break;
        case "projects":
          await api.deleteProject(id);
          break;
        case "impact":
          await api.deleteImpactStory(id);
          break;
        case "staff":
          await api.deleteStaff(id);
          break;
        case "careers":
          await api.deleteCareer(id);
          break;
        case "testimonials":
          await api.deleteTestimonial(id);
          break;
        case "reviews":
          await api.deleteReview(id);
          break;
        case "comments":
          await api.deleteComment(id);
          break;
      }
      toast({
        title: "Success",
        description: "Item deleted successfully",
      });
    loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to delete",
        variant: "destructive",
      });
    }
  };

  const handleToggleApproval = async (
    type: "testimonials" | "reviews" | "comments",
    id: string,
    currentStatus: boolean
  ) => {
    try {
      switch (type) {
        case "testimonials":
          await api.updateTestimonial(id, { approved: !currentStatus });
          break;
        case "reviews":
          await api.updateReview(id, { approved: !currentStatus });
          break;
        case "comments":
          await api.updateComment(id, { approved: !currentStatus });
          break;
      }
      toast({
        title: "Success",
        description: `Item ${!currentStatus ? "approved" : "unapproved"}`,
      });
      loadData();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to update",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    api.logout();
    setIsAuthenticated(false);
    toast({
      title: "Logged Out",
      description: "You have been logged out",
    });
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  const tabs = [
    { id: "articles" as TabType, label: "Articles", icon: BookOpen },
    { id: "services" as TabType, label: "Services", icon: Briefcase },
    { id: "projects" as TabType, label: "Projects", icon: Building2 },
    { id: "impact" as TabType, label: "Impact Stories", icon: Heart },
    { id: "staff" as TabType, label: "Staff", icon: Users },
    { id: "careers" as TabType, label: "Careers", icon: UserPlus },
    { id: "testimonials" as TabType, label: "Testimonials", icon: Star },
    { id: "reviews" as TabType, label: "Reviews", icon: MessageSquare },
    { id: "comments" as TabType, label: "Comments", icon: MessageCircle },
    { id: "contact" as TabType, label: "Contact", icon: Mail },
    { id: "newsletter" as TabType, label: "Newsletter", icon: Send },
  ];

  function getCountForTab(tab: TabType): number {
    switch (tab) {
      case "articles":
        return articles.length;
      case "services":
        return services.length;
      case "projects":
        return projects.length;
      case "impact":
        return impactStories.length;
      case "staff":
        return staff.length;
      case "careers":
        return careers.length;
      case "testimonials":
        return testimonials.length;
      case "reviews":
        return reviews.length;
      case "comments":
        return comments.length;
      case "contact":
        return contactSubmissions.length;
      case "newsletter":
        return newsletterSubscribers.length;
      default:
        return 0;
    }
  }

  return (
      <div className="min-h-screen bg-muted/30">
      {/* Admin Header */}
      <header className="bg-white border-b border-border sticky top-0 z-50">
        <div className="container-corporate">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center gap-4">
                <h1 className="font-heading text-xl md:text-2xl text-foreground">
                  Admin Panel
              </h1>
            </div>
              <div className="flex items-center gap-3">
                <Link to="/">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    View Site
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r border-border overflow-y-auto">
          <nav className="p-4 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const count = getCountForTab(tab.id);
              return (
              <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setShowForm(false);
                    setEditingItem(null);
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    activeTab === tab.id
                      ? "bg-primary text-white"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="flex-1 text-left">{tab.label}</span>
                  <span className={`text-sm ${activeTab === tab.id ? "text-white/80" : "text-muted-foreground"}`}>
                    {count}
                  </span>
              </button>
              );
            })}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-muted/30">
          <div className="container-corporate py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Content */}
              {loading ? (
                <div className="text-center py-12 text-muted-foreground">
                  Loading...
            </div>
              ) : (
                <div>
                  {/* Articles Tab */}
                  {activeTab === "articles" && (
                    <>
                    {showForm ? (
                      <ArticleForm
                        article={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <ArticlesSection
                        articles={articles}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("articles", id)}
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Services Tab */}
                  {activeTab === "services" && (
                    <>
                    {showForm ? (
                      <ServiceForm
                        service={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <ServicesSection
                        services={services}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("services", id)}
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Projects Tab */}
                  {activeTab === "projects" && (
                    <>
                    {showForm ? (
                      <ProjectForm
                        project={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <ProjectsSection
                        projects={projects}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("projects", id)}
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Impact Stories Tab */}
                  {activeTab === "impact" && (
                    <>
                    {showForm ? (
                      <ImpactForm
                        impactStory={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <ImpactSection
                        impactStories={impactStories}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("impact", id)}
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Staff Tab */}
                  {activeTab === "staff" && (
                    <>
                    {showForm ? (
                      <StaffForm
                        staff={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <StaffSection
                        staff={staff}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("staff", id)}
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

            {/* Testimonials Tab */}
                  {activeTab === "testimonials" && (
                    <>
                    {showForm ? (
                      <TestimonialForm
                        testimonial={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <TestimonialsSection
                        testimonials={testimonials}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("testimonials", id)}
                        onToggleApproval={(id, status) =>
                          handleToggleApproval("testimonials", id, status)
                        }
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Reviews Tab */}
                  {activeTab === "reviews" && (
                    <>
                    {showForm ? (
                      <ReviewForm
                        review={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <ReviewsSection
                        reviews={reviews}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("reviews", id)}
                        onToggleApproval={(id, status) =>
                          handleToggleApproval("reviews", id, status)
                        }
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Comments Tab */}
                  {activeTab === "comments" && (
                    <>
                    {showForm ? (
                      <CommentForm
                        comment={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <CommentsSection
                        comments={comments}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("comments", id)}
                        onToggleApproval={(id, status) =>
                          handleToggleApproval("comments", id, status)
                        }
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Careers Tab */}
                  {activeTab === "careers" && (
                    <>
                    {showForm ? (
                      <CareerForm
                        career={editingItem}
                        onClose={() => {
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                        onSave={() => {
                          loadData();
                          setShowForm(false);
                          setEditingItem(null);
                        }}
                      />
                    ) : (
                      <CareersSection
                        careers={careers}
                        onEdit={(item) => {
                          setEditingItem(item);
                          setShowForm(true);
                        }}
                        onDelete={(id) => handleDelete("careers", id)}
                        onAdd={() => {
                          setEditingItem(null);
                          setShowForm(true);
                        }}
                      />
                    )}
                    </>
                  )}

                  {/* Contact Tab */}
                  {activeTab === "contact" && (
                    <ContactSection submissions={contactSubmissions} />
                  )}

                  {/* Newsletter Tab */}
                  {activeTab === "newsletter" && (
                    <NewsletterSection 
                      subscribers={newsletterSubscribers}
                      onRefresh={loadData}
                    />
                  )}
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// Section Components
function ArticlesSection({
  articles,
  onEdit,
  onDelete,
  onAdd,
}: any) {
  return (
              <div>
                <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Articles</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Article
                        </Button>
                      </div>
                <div className="space-y-4">
        {articles.map((article: any) => (
                    <div
            key={article.id}
                      className={`bg-white border border-border p-6 ${
              !article.published ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                          <div>
                <h3 className="font-heading text-lg text-foreground">
                  {article.title}
                </h3>
                            <p className="text-sm text-muted-foreground">
                  {article.category} • {article.date}
                </p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {article.likes || 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    {article.views || 0}
                  </span>
                            </div>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs ${
                  article.published
                    ? "bg-green-100 text-green-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {article.published ? "Published" : "Draft"}
                          </span>
                        </div>
            <p className="text-muted-foreground mb-4">{article.excerpt}</p>
                      <div className="flex items-center gap-2">
                  <Button
                          size="sm"
                          variant="outline"
                onClick={() => onEdit(article)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onDelete(article.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                  </Button>
                </div>
                    </div>
                  ))}
        {articles.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
            No articles yet. Add your first article!
                    </div>
                  )}
                </div>
              </div>
  );
}

// Similar sections for Services, Projects, Staff, Testimonials, Reviews, Comments, Contact
// I'll create simplified versions due to length constraints

function ServicesSection({ services, onEdit, onDelete, onAdd }: any) {
  return (
                        <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Services</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Service
        </Button>
                        </div>
      <div className="space-y-4">
        {services.map((service: any) => (
          <div key={service.id} className="bg-white border border-border p-6">
            <div className="flex items-start justify-between mb-4">
                        <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {service.subtitle}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {service.description}
                </p>
                <span
                  className={`px-2 py-1 text-xs ${
                    service.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {service.published ? "Published" : "Draft"}
                </span>
                        </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(service)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(service.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
        {services.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No services yet. Add your first service!
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectsSection({ projects, onEdit, onDelete, onAdd }: any) {
  return (
                        <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Projects</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Project
        </Button>
                        </div>
      <div className="space-y-4">
        {projects.map((project: any) => (
          <div key={project.id} className="bg-white border border-border p-6">
            <div className="flex items-start justify-between mb-4">
                        <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {project.category} • {project.status}
                </p>
                {project.value && (
                  <p className="text-sm text-primary mb-2 font-medium">
                    {project.value}
                  </p>
                )}
                <p className="text-sm text-muted-foreground mb-4">
                  {project.description}
                </p>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 text-xs ${
                      project.isActive
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {project.isActive ? "Active" : "Completed"}
                  </span>
                  <span
                    className={`px-2 py-1 text-xs ${
                      project.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {project.published ? "Published" : "Draft"}
                  </span>
                        </div>
                        </div>
                        </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(project)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(project.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
                      </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No projects yet. Add your first project!
          </div>
        )}
      </div>
    </div>
  );
}

function ImpactSection({ impactStories, onEdit, onDelete, onAdd }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Impact Stories</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Impact Story
        </Button>
      </div>
      <div className="space-y-4">
        {impactStories.map((story: any) => (
          <div key={story.id} className={`bg-white border border-border p-6 ${!story.published ? "opacity-60" : ""}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {story.title}
                </h3>
                <p className="text-sm text-primary mb-2">{story.category} • {story.location}</p>
                <p className="text-sm text-muted-foreground mb-4">{story.impact}</p>
                <span
                  className={`px-2 py-1 text-xs ${
                    story.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {story.published ? "Published" : "Draft"}
                </span>
              </div>
              {story.image && (
                <img src={story.image} alt={story.title} className="w-20 h-auto object-cover ml-4" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(story)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(story.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
        {impactStories.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No impact stories yet. Add your first impact story!
          </div>
        )}
      </div>
    </div>
  );
}

function StaffSection({ staff, onEdit, onDelete, onAdd }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Staff</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Staff
                        </Button>
      </div>
      <div className="space-y-4">
        {staff.map((member: any) => (
          <div key={member.id} className="bg-white border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                <span
                  className={`px-2 py-1 text-xs ${
                    member.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {member.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(member)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(member.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
                        </Button>
                      </div>
          </div>
        ))}
        {staff.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No staff members yet. Add your first staff member!
                  </div>
                )}
      </div>
    </div>
  );
}

function TestimonialsSection({
  testimonials,
  onEdit,
  onDelete,
  onToggleApproval,
  onAdd,
}: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Testimonials</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Testimonial
        </Button>
      </div>
                <div className="space-y-4">
        {testimonials.map((testimonial: any) => (
                    <div
                      key={testimonial.id}
                      className={`bg-white border border-border p-6 ${
              !testimonial.approved ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                          <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                              {testimonial.role}
                              {testimonial.company && ` at ${testimonial.company}`}
                            </p>
                <div className="flex items-center gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < testimonial.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {testimonial.content}
                </p>
                          <span
                            className={`px-2 py-1 text-xs ${
                              testimonial.approved
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                  {testimonial.approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onEdit(testimonial)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onToggleApproval(testimonial.id, testimonial.approved)}
                        >
                          {testimonial.approved ? (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Unapprove
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onDelete(testimonial.id)}
                className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {testimonials.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No testimonials yet. Add your first testimonial!
                    </div>
                  )}
                </div>
              </div>
  );
}

function ReviewsSection({
  reviews,
  onEdit,
  onDelete,
  onToggleApproval,
  onAdd,
}: any) {
  return (
              <div>
                <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Reviews</h2>
        <Button onClick={onAdd} variant="hero">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Review
                  </Button>
                </div>
                <div className="space-y-4">
        {reviews.map((review: any) => (
                    <div
                      key={review.id}
                      className={`bg-white border border-border p-6 ${
              !review.approved ? "opacity-60" : ""
                      }`}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {review.authorName}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {review.authorEmail}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                            Article: <span className="font-medium">{review.articleSlug}</span>
                          </p>
                <div className="flex items-center gap-1 mb-2">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                <p className="text-sm text-muted-foreground mb-4">
                  {review.content}
                </p>
                          <span
                            className={`px-2 py-1 text-xs ${
                              review.approved
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                  {review.approved ? "Approved" : "Pending"}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onEdit(review)}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onToggleApproval(review.id, review.approved)}
                        >
                          {review.approved ? (
                            <>
                              <X className="w-4 h-4 mr-1" />
                              Unapprove
                            </>
                          ) : (
                            <>
                              <Check className="w-4 h-4 mr-1" />
                              Approve
                            </>
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                onClick={() => onDelete(review.id)}
                className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                  {reviews.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                      No reviews yet. Add your first review!
                    </div>
                  )}
                </div>
              </div>
  );
}

function CommentsSection({
  comments,
  onEdit,
  onDelete,
  onToggleApproval,
  onAdd,
}: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Comments</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Comment
        </Button>
      </div>
      <div className="space-y-4">
        {comments.map((comment: any) => (
          <div
            key={comment.id}
            className={`bg-white border border-border p-6 ${
              !comment.approved ? "opacity-60" : ""
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {comment.authorName}
                </h3>
                <p className="text-sm text-muted-foreground mb-2">
                  {comment.authorEmail}
                </p>
                <p className="text-xs text-muted-foreground mb-2">
                  Article: <span className="font-medium">{comment.articleSlug}</span>
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  {comment.content}
                </p>
                <span
                  className={`px-2 py-1 text-xs ${
                    comment.approved
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {comment.approved ? "Approved" : "Pending"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onEdit(comment)}
              >
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onToggleApproval(comment.id, comment.approved)}
              >
                {comment.approved ? (
                  <>
                    <X className="w-4 h-4 mr-1" />
                    Unapprove
                  </>
                ) : (
                  <>
                    <Check className="w-4 h-4 mr-1" />
                    Approve
                  </>
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(comment.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
          </div>
        </div>
        ))}
        {comments.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No comments yet. Add your first comment!
      </div>
        )}
      </div>
    </div>
  );
}

function CareersSection({ careers, onEdit, onDelete, onAdd }: any) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-heading text-2xl text-foreground">Careers</h2>
        <Button onClick={onAdd} variant="hero">
          <Plus className="w-4 h-4 mr-2" />
          Add Career
        </Button>
      </div>
      <div className="space-y-4">
        {careers.map((career: any) => (
          <div key={career.id} className="bg-white border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {career.title}
                </h3>
                <p className="text-sm text-primary mb-2">{career.department}</p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
                  <span>{career.location}</span>
                  <span>•</span>
                  <span>{career.type}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">{career.description}</p>
                <span
                  className={`px-2 py-1 text-xs ${
                    career.published
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {career.published ? "Published" : "Draft"}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline" onClick={() => onEdit(career)}>
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => onDelete(career.id)}
                className="text-red-600"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
        ))}
        {careers.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No careers yet. Add your first career position!
          </div>
        )}
      </div>
    </div>
  );
}

function ContactSection({ submissions }: any) {
  return (
    <div>
      <h2 className="font-heading text-2xl text-foreground mb-6">
        Contact Submissions ({submissions.length})
      </h2>
      <div className="space-y-4">
        {submissions.map((submission: any) => (
          <div key={submission.id} className="bg-white border border-border p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-heading text-lg text-foreground mb-2">
                  {submission.firstName} {submission.lastName}
                </h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    <span className="font-medium">Email:</span> {submission.email}
                  </p>
                  {submission.phone && (
                    <p>
                      <span className="font-medium">Phone:</span> {submission.phone}
                    </p>
                  )}
                  {submission.company && (
                    <p>
                      <span className="font-medium">Company:</span> {submission.company}
                    </p>
                  )}
                  <p>
                    <span className="font-medium">Inquiry Type:</span> {submission.inquiryType}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2">
                    Submitted: {new Date(submission.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
            {submission.message && (
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm font-medium mb-2">Message:</p>
                <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                  {submission.message}
                </p>
              </div>
            )}
          </div>
        ))}
        {submissions.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            No contact submissions yet.
          </div>
        )}
      </div>
    </div>
  );
}

function NewsletterSection({ subscribers, onRefresh }: { subscribers: any[]; onRefresh: () => void }) {
  return (
    <div className="space-y-8">
      {/* Send Newsletter Form */}
      <div className="bg-white border border-border p-6 rounded-lg">
        <h2 className="font-heading text-2xl text-foreground mb-6">
          Send Newsletter
        </h2>
        <NewsletterForm 
          subscriberCount={subscribers.length}
          onSuccess={onRefresh}
        />
      </div>

      {/* Subscribers List */}
      <div>
        <h2 className="font-heading text-2xl text-foreground mb-6">
          Subscribers ({subscribers.length})
        </h2>
        <div className="bg-white border border-border rounded-lg overflow-hidden">
          <div className="divide-y divide-border">
            {subscribers.map((subscriber: any) => (
              <div key={subscriber.id} className="p-4 hover:bg-muted/50 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-foreground">{subscriber.email}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Subscribed: {new Date(subscriber.created_at).toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            {subscribers.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">
                No subscribers yet.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Admin;
