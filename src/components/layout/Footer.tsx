import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Bell } from "lucide-react";
import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

const additionalLinks = [
  { name: "Impact Stories", href: "/impact" },
  { name: "Vision & Mission", href: "/about#vision" },
  { name: "Careers", href: "/careers" },
  { name: "FAQ", href: "/faq" },
];

const legal = [
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms & Conditions", href: "/terms" },
  { name: "Compliance", href: "/compliance" },
  { name: "Fraud Prevention", href: "/fraud-prevention" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [shouldShake, setShouldShake] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Start shaking after 5 minutes (300000ms)
    const timer = setTimeout(() => {
      setShouldShake(true);
    }, 300000); // 5 minutes

    return () => clearTimeout(timer);
  }, []);

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
    <footer className="bg-[#111111] border-t border-gray-800">
      <div className="container-corporate">
        {/* Main Footer Content */}
        <div className="py-10 md:py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-8 lg:gap-12 mb-10 md:mb-12">
            {/* Logo & Description */}
            <div className="lg:col-span-1 flex flex-col">
              <Link to="/" className="inline-flex items-center mb-5 md:mb-6">
                <img 
                  src="/logo.svg" 
                  alt="Canon Capital Partners LLC" 
                  className="h-12 sm:h-14 md:h-16 lg:h-[72px] w-auto max-w-[200px] object-contain object-left"
                  style={{ filter: 'brightness(0) invert(1)' }}
                />
              </Link>
              <p className="text-[#EEEEEE] text-xs sm:text-sm leading-relaxed max-w-xs">
                A multidisciplinary financial advisory firm specializing in project finance, structured finance, 
                development finance, and capital mobilization.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-heading text-white text-xs sm:text-sm font-semibold uppercase tracking-wide mb-5 md:mb-6">
                Quick Links
              </h4>
              <ul className="space-y-2.5 md:space-y-3">
                {additionalLinks.map((link) => {
                  if (link.href.includes('#')) {
                    const [path, hash] = link.href.split('#');
                    return (
                      <li key={link.name}>
                        <Link
                          to={path}
                          onClick={(e) => {
                            if (hash) {
                              setTimeout(() => {
                                const element = document.getElementById(hash);
                                if (element) {
                                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                                }
                              }, 100);
                            }
                          }}
                          className="text-sm text-[#EEEEEE] hover:text-primary transition-colors duration-200 inline-block"
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  }
                  return (
                    <li key={link.name}>
                      <Link
                        to={link.href}
                        className="text-sm text-[#EEEEEE] hover:text-primary transition-colors duration-200 inline-block"
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-heading text-white text-xs sm:text-sm font-semibold uppercase tracking-wide mb-5 md:mb-6">
                Contact
              </h4>
              <div className="space-y-3 text-xs sm:text-sm text-[#EEEEEE]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Delta Corner, Westlands, Nairobi, Kenya</span>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <div className="flex flex-col gap-1.5">
                    <a
                      href="tel:+254730112028"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      +254 730 112 028
                    </a>
                    <a
                      href="tel:+254730112027"
                      className="hover:text-primary transition-colors duration-200"
                    >
                      +254 730 112 027
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <a
                    href="mailto:inquiries@cannoncapitalpartners.org"
                    className="hover:text-primary transition-colors duration-200 break-all leading-relaxed"
                  >
                    inquiries@cannoncapitalpartners.org
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-heading text-white text-xs sm:text-sm font-semibold uppercase tracking-wide mb-5 md:mb-6">
                Newsletter
              </h4>
              <form onSubmit={handleSubmit} className="mb-4">
                <div className="bg-[#1a1a1a] border border-gray-700 rounded-sm px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3 focus-within:border-primary/50 transition-colors">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    required
                    className="flex-1 bg-transparent text-white text-xs sm:text-sm placeholder-gray-400 focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    aria-label="Subscribe"
                  >
                    <ArrowRight className="w-4 h-4 text-white hover:text-primary transition-colors" />
                  </button>
                </div>
              </form>
              <p className="text-xs text-gray-400 leading-relaxed">
                Subscribe to stay updated with latest news and insights.
              </p>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 md:pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
              {/* Copyright */}
              <p className="text-xs text-gray-400 text-center md:text-left order-2 md:order-1">
                © {new Date().getFullYear()} Canon Capital Partners LLC. All rights reserved.
              </p>

              {/* Social Media & Legal Links */}
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 order-1 md:order-2 w-full md:w-auto justify-center md:justify-end">
                {/* Social Media */}
                <div className="flex items-center gap-3 sm:gap-4">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                    aria-label="Facebook"
                  >
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-primary transition-colors duration-200"
                    aria-label="Instagram"
                  >
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>

                {/* Legal Links */}
                <div className="flex items-center gap-3 sm:gap-4 text-xs flex-wrap justify-center">
                  {legal.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className="text-gray-400 hover:text-primary transition-colors duration-200 whitespace-nowrap"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
