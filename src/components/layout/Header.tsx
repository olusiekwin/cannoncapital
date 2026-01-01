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
      {/* Top Contact Bar / Ribbon - Compact on mobile */}
      <div className="bg-[#111111] text-white py-1 md:py-2 border-b border-gray-800">
        <div className="container-corporate">
          <div className="flex flex-row items-center justify-between gap-2 md:gap-4 text-[10px] md:text-xs">
            {/* Left: Business Hours - Simplified on mobile */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
              <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary flex-shrink-0" />
              <span className="hidden sm:inline font-medium">Canon Capital Partners LLC:</span>
              <span className={isOpen ? "text-primary font-semibold" : "text-gray-400"}>
                {isOpen ? "Open" : "Closed"}
              </span>
              <span className="text-gray-400 hidden md:inline">(8:00 AM - 5:00 PM)</span>
            </div>
            
            {/* Center: Contact Info - Simplified on mobile */}
            <div className="flex items-center gap-2 md:gap-4 flex-1 justify-center">
              <a 
                href="tel:+254730112028" 
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Phone className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                <span className="hidden md:inline">Call:</span>
                <span className="font-medium text-[10px] md:text-xs">+254 730 112 028</span>
              </a>
              <a 
                href="mailto:inquiries@cannoncapitalpartners.org" 
                className="flex items-center gap-1 hover:text-primary transition-colors"
              >
                <Mail className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                <span className="hidden lg:inline">inquiries@cannoncapitalpartners.org</span>
                <span className="lg:hidden text-[10px] md:text-xs">Email</span>
              </a>
            </div>

            {/* Right: CTA Button - Smaller on mobile */}
            <div className="flex-shrink-0">
              <Link
                to="/contact"
                className="inline-flex items-center gap-1 md:gap-2 px-2 md:px-4 py-0.5 md:py-1.5 bg-primary text-white text-[10px] md:text-xs font-medium uppercase tracking-wide hover:bg-primary/90 transition-colors duration-200 whitespace-nowrap"
              >
                <span className="hidden sm:inline">Get Started</span>
                <span className="sm:hidden">Start</span>
                <ArrowRight className="w-3 h-3 md:w-3.5 md:h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <nav className="container-corporate">
        <div className="flex h-20 md:h-28 lg:h-36 items-center justify-between">
          {/* Logo - Responsive sizes */}
          <Link to="/" className="flex items-center flex-shrink-0">
            <img 
              src="/logo.svg" 
              alt="Canon Capital Partners LLC" 
              className="h-16 md:h-24 lg:h-32 w-auto"
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
