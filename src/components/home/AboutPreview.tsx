import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { Link } from "react-router-dom";


export function AboutPreview() {
  return (
      <section className="section-padding bg-white">
      <div className="container-corporate">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-14 items-center">
          <div className="relative">
            <div className="aspect-[4/3] overflow-hidden border border-border">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop"
                alt="Canon Capital Partners LLC financial advisory team"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block absolute -bottom-6 -right-6 lg:-bottom-8 lg:-right-8 w-24 h-24 lg:w-32 lg:h-32 border border-primary bg-white" />
          </div>

          <div className="lg:pl-8">
            <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-3 sm:mb-4 block">
              About Canon Capital Partners LLC
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl text-foreground mb-4 sm:mb-6 leading-tight">
              Bridging Opportunity and Capital
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5 sm:mb-6 text-sm sm:text-base">
              We are a multidisciplinary financial advisory and investment firm specializing in project finance, 
              structured finance, development finance, and capital mobilization. We connect high-value projects 
              with strategic capital, leveraging deep expertise and strong investor networks.
            </p>
            <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8">
              <li className="flex items-start gap-3 text-muted-foreground text-sm sm:text-base">
                <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" strokeWidth={2} />
                <span>Global access to private investors, banks, and institutional partners</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm sm:text-base">
                <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" strokeWidth={2} />
                <span>Deep advisory expertise in complex, high-value transactions</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm sm:text-base">
                <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" strokeWidth={2} />
                <span>Trusted partnerships with governments, developers, and corporations</span>
              </li>
              <li className="flex items-start gap-3 text-muted-foreground text-sm sm:text-base">
                <Check className="w-4 h-4 text-primary mt-1 flex-shrink-0" strokeWidth={2} />
                <span>Impact-driven and ESG-aligned financing strategies</span>
              </li>
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Link to="/about">
                <Button variant="heroOutline">Learn More</Button>
              </Link>
              <Link to="/projects">
                <Button variant="hero">View Case Work</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
