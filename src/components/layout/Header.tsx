import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Clock, Phone, Mail, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "About", href: "/about", priority: "primary" },
  { name: "Services", href: "/services", priority: "primary" },
  { name: "Projects", href: "/projects", priority: "primary" },
  { name: "Insights", href: "/insights", priority: "secondary" },
  { name: "Contact", href: "/contact", priority: "primary" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const currentHour = now.getHours();
      // Open at 8 AM (8) and close at 5 PM (17)
      setIsOpen(currentHour >= 8 && currentHour < 17);
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      {/* Top Contact Bar / Ribbon */}
      <div className="bg-[#111111] text-white py-2.5 border-b border-gray-800">
        <div className="container-corporate">
          <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
            {/* Left: Business Hours */}
            <div className="flex flex-wrap items-center gap-2 md:gap-3 text-xs justify-center md:justify-start">
              <Clock className="w-3.5 h-3.5 text-primary flex-shrink-0" />
              <span className="font-medium">Canon Capital Partners LLC:</span>
              <span className={isOpen ? "text-primary font-semibold" : "text-gray-400"}>
                {isOpen ? "Open" : "Closed"}
              </span>
              <span className="text-gray-400 hidden sm:inline">(8:00 AM - 5:00 PM)</span>
            </div>
            
            {/* Center: Contact Info */}
            <div className="flex flex-wrap items-center gap-3 md:gap-6 text-xs justify-center">
              <a 
                href="tel:+254730112028" 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Call:</span>
                <span className="font-medium">+254 730 112 028</span>
              </a>
              <a 
                href="mailto:inquiries@cannoncapitalpartners.org" 
                className="flex items-center gap-1.5 hover:text-primary transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span className="hidden md:inline">Email:</span>
                <span className="hidden lg:inline">inquiries@cannoncapitalpartners.org</span>
                <span className="lg:hidden">Email Us</span>
              </a>
            </div>

            {/* Right: CTA Button */}
            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary text-white text-xs font-medium uppercase tracking-wide hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap"
              >
                Get Started
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="container-corporate">
        <div className="flex h-32 lg:h-36 items-center justify-between">
          {/* Logo - Larger */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Canon Capital Partners LLC" 
              className="h-28 lg:h-32 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Right aligned */}
          <div className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "font-body transition-colors duration-200",
                  item.priority === "primary"
                    ? "text-sm font-medium text-foreground hover:text-primary"
                    : "text-sm text-muted-foreground hover:text-foreground",
                  (location.pathname === item.href || location.pathname.startsWith(item.href + '/')) && "text-primary font-medium"
                )}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden p-2 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-border max-h-[70vh] overflow-y-auto">
            <div className="py-6 space-y-2">
              {navigation.map((item) => (
                  <Link
                  key={item.name}
                    to={item.href}
                    className={cn(
                      "block py-2 text-sm font-body font-medium uppercase tracking-wide",
                      location.pathname === item.href
                        ? "text-primary"
                        : "text-foreground/80"
                    )}
                  onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
              ))}
              <div className="pt-4">
                <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="corporate" className="w-full">
                    Schedule Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
