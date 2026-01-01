import { useState } from "react";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Facebook, Twitter, Instagram, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const services = [
  { name: "Project Finance", href: "#project-finance" },
  { name: "Structured Finance", href: "#structured-finance" },
  { name: "Development & Impact Finance", href: "#development-impact-finance" },
  { name: "Capital Raising & Advisory", href: "#capital-raising-advisory" },
  { name: "Asset & Resource Management", href: "#asset-resource-management" },
];

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "About", href: "/about" },
  { name: "Insights", href: "/insights" },
  { name: "Impact", href: "/impact" },
  { name: "Contact", href: "/contact" },
];

interface PageSidebarProps {
  variant?: "services" | "general" | "insights" | "projects" | "about";
  showServices?: boolean;
  showNavigation?: boolean;
  showCTA?: boolean;
  customContent?: React.ReactNode;
}

export function PageSidebar({ 
  variant = "general", 
  showServices = true,
  showNavigation = true,
  showCTA = true,
  customContent 
}: PageSidebarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const location = useLocation();

  // Context-aware content based on variant
  const getContextualContent = () => {
    switch (variant) {
      case "insights":
        return (
          <div className="border border-border bg-muted/20 p-6 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-semibold">
              Popular Articles
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Discover our most read insights on market trends and wealth management strategies.
            </p>
          </div>
        );
      case "projects":
        return (
          <div className="border border-border bg-muted/20 p-6 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-semibold">
              Our Expertise
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Explore how we've helped clients achieve their financial objectives through strategic advisory.
            </p>
          </div>
        );
      case "about":
        return (
          <div className="border border-border bg-muted/20 p-6 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-semibold">
              Our Values
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Integrity, excellence, and partnership guide everything we do for our clients.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-6">
      {/* Social Media Links */}
      <div className="flex items-center gap-4 text-sm">
        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          FaceBook
        </a>
        <a
          href="https://twitter.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Twitter / X
        </a>
        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors duration-200"
        >
          Instagrams
        </a>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pr-10 border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all duration-200"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
      </div>

      {/* Navigation Section */}
      {showNavigation && (
        <div className="border border-border">
          <div className="bg-foreground text-white px-4 py-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide">
              Navigation
            </h3>
          </div>
          <div className="bg-white">
            {navigation.map((item, index) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "block px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-200 group",
                  location.pathname === item.href && "bg-muted/20"
                )}
              >
                <div className="flex items-center justify-between">
                  <span className={cn(
                    "text-sm transition-colors duration-200",
                    location.pathname === item.href 
                      ? "text-primary font-medium" 
                      : "text-foreground group-hover:text-primary"
                  )}>
                    {item.name}
                  </span>
                  {location.pathname === item.href && (
                    <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Services Section */}
      {showServices && (
        <div className="border border-border">
          <div className="bg-foreground text-white px-4 py-3">
            <h3 className="font-heading text-sm font-semibold uppercase tracking-wide">
              Services
            </h3>
          </div>
          <div className="bg-white">
            {services.map((service) => {
              const serviceHash = service.href.replace('#', '');
              const currentHash = location.hash.replace('#', '');
              const isActive = currentHash === serviceHash;
              const isOnServicesPage = location.pathname === '/services';
              
              return (
                <a
                  key={service.name}
                  href={isOnServicesPage ? service.href : `/services${service.href}`}
                  onClick={(e) => {
                    if (isOnServicesPage) {
                      e.preventDefault();
                      const element = document.querySelector(service.href);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        window.history.pushState(null, '', service.href);
                      }
                    }
                  }}
                  className={cn(
                    "block px-4 py-3 border-b border-border last:border-b-0 hover:bg-muted/30 transition-colors duration-200 group cursor-pointer",
                    isActive && "bg-muted/20"
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className={cn(
                      "text-sm transition-colors duration-200",
                      isActive 
                        ? "text-primary font-medium" 
                        : "text-foreground group-hover:text-primary"
                    )}>
                      {service.name}
                    </span>
                    {isActive && (
                      <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* Contextual Content */}
      {getContextualContent()}

      {/* Custom Content */}
      {customContent}

      {/* CTA Section */}
      {showCTA && (
        <div className="border border-border bg-muted/20 p-6 space-y-4">
          <h3 className="font-heading text-lg text-foreground font-semibold">
            Ready to Get Started?
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Let's discuss how we can help you achieve your financial objectives.
          </p>
          <Link to="/contact" className="block">
            <Button 
              variant="hero" 
              className="w-full group"
            >
              Schedule Consultation
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
          <div className="pt-4 border-t border-border">
            <div className="space-y-2 text-xs text-muted-foreground">
              <div className="flex items-center justify-between">
                <span>Phone:</span>
                <a href="tel:+254730112028" className="text-foreground hover:text-primary transition-colors text-xs">
                  +254 730 112 028
                </a>
              </div>
              <div className="flex items-center justify-between">
                <span>Email:</span>
                <a href="mailto:inquiries@cannoncapitalpartners.org" className="text-foreground hover:text-primary transition-colors text-xs break-all">
                  inquiries@cannoncapitalpartners.org
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

// Export the old name for backward compatibility
export function ServicesSidebar() {
  return <PageSidebar variant="services" />;
}
