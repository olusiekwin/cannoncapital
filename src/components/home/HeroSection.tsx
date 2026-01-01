import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden py-12 sm:py-16 lg:py-20">
      {/* Background with overlay - Dark background with transparency */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=2070&auto=format&fit=crop')`,
          }}
        />
        {/* Light overlay for readability */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Content */}
      <div className="container-corporate relative z-10">
        <div className="max-w-3xl">
          {/* Overline */}
          <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-8 opacity-0 animate-fade-up">
            <div className="w-8 sm:w-12 h-[1px] bg-primary" />
            <span className="text-xs font-body uppercase tracking-[0.3em] text-primary">
              Project Finance & Capital Mobilization
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl text-foreground leading-[1.1] mb-6 sm:mb-8 opacity-0 animate-fade-up animation-delay-100">
            Connecting Projects.
            <br />
            Mobilizing Capital.
            <br />
            <span className="text-primary">Driving Growth.</span>
          </h1>

          {/* Subheading */}
          <p className="font-body text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mb-8 sm:mb-10 md:mb-12 leading-relaxed opacity-0 animate-fade-up animation-delay-200">
            A multidisciplinary financial advisory firm specializing in project finance, structured finance, 
            and development finance. We connect high-value projects with strategic capital across emerging and global markets.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 opacity-0 animate-fade-up animation-delay-300">
            <Link to="/contact">
              <Button variant="hero">
                Begin Consultation
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="heroOutline">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-up animation-delay-400">
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-body uppercase tracking-[0.2em] text-muted-foreground">
            Scroll
          </span>
          <div className="w-[1px] h-8 bg-gradient-to-b from-primary to-transparent" />
        </div>
      </div>
    </section>
  );
}
