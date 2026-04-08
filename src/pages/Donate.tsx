import { Layout } from "@/components/layout/Layout";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Heart, Landmark, Users } from "lucide-react";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const pillars = [
  {
    icon: Heart,
    title: "Mission-aligned giving",
    body: "Philanthropic support helps scale programs that combine rigorous finance with measurable community and environmental outcomes.",
  },
  {
    icon: Landmark,
    title: "Structured partnerships",
    body: "We work with foundations, family offices, and institutions to align capital with impact themes that match your mandate.",
  },
  {
    icon: Users,
    title: "Transparent engagement",
    body: "Every relationship begins with clarity on goals, reporting, and governance—so donors and partners know how capital is deployed.",
  },
];

const Donate = () => {
  return (
    <Layout>
      <AnimatedHero
        label="Donate & partner"
        title="Support Impact Through Strategic Finance"
        subtitle="Whether you are considering a donation, a program-related investment, or a strategic partnership, we welcome aligned capital that strengthens communities and sustainable development."
        backgroundImage="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2070&auto=format&fit=crop"
      />

      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div>
              <div className="flex items-center gap-4 mb-8">
                <div className="h-[1px] w-12 bg-primary" />
                <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
                  How to engage
                </span>
              </div>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Ways to contribute
              </h2>
              <p className="text-muted-foreground leading-relaxed text-lg mb-12 max-w-2xl">
                CannonCapital connects advisory work with real-world outcomes. Donations and partnership capital can support research,
                technical assistance, and initiatives where traditional markets under-serve high-impact opportunities. We do not process
                card payments on this site—our team will guide you through appropriate structures and due diligence.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {pillars.map((item) => (
                  <div
                    key={item.title}
                    className="border border-border p-6 hover:bg-muted/30 transition-colors duration-300"
                  >
                    <item.icon className="w-8 h-8 text-primary mb-4" />
                    <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:sticky lg:top-32 lg:h-fit">
              <PageSidebar variant="general" showServices={false} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 lg:py-32 bg-charcoal border-t border-border">
        <div className="container-corporate text-center max-w-2xl mx-auto space-y-6">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground font-semibold">
            Talk to our team
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Share your objectives, timeline, and any compliance requirements. We will respond with next steps and the right point of contact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Link to="/contact">
              <Button variant="hero" className="group">
                Discuss giving
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Button>
            </Link>
            <Link to="/impact">
              <Button variant="outline" className="border-border text-foreground hover:bg-muted">
                View impact stories
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Donate;
