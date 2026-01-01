import { Layout } from "@/components/layout/Layout";
import { Shield, FileCheck, Scale, Globe } from "lucide-react";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const Compliance = () => {
  return (
    <Layout>
      <section className="py-24 lg:py-32 border-b border-border">
        <div className="container-corporate">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Regulatory
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Compliance & Regulatory Disclosures
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Canon Capital Partners LLC maintains rigorous compliance standards and operates under 
            the oversight of relevant regulatory authorities across all jurisdictions in which we conduct business.
          </p>
        </div>
      </section>

      {/* Regulatory Framework */}
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0">
            <div className="p-8 border-t border-border lg:border-r">
              <Shield className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-3">SEC Registered</h3>
              <p className="text-sm text-muted-foreground">
                Registered Investment Adviser with the U.S. Securities and Exchange Commission
              </p>
            </div>
            <div className="p-8 border-t border-border lg:border-r">
              <FileCheck className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-3">FINRA Member</h3>
              <p className="text-sm text-muted-foreground">
                Member of the Financial Industry Regulatory Authority for applicable broker-dealer activities
              </p>
            </div>
            <div className="p-8 border-t border-border lg:border-r">
              <Scale className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-3">Fiduciary Standard</h3>
              <p className="text-sm text-muted-foreground">
                We operate under a fiduciary duty to act in our clients' best interests
              </p>
            </div>
            <div className="p-8 border-t border-border">
              <Globe className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-3">Global Compliance</h3>
              <p className="text-sm text-muted-foreground">
                Licensed and regulated across all jurisdictions in which we operate
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclosures */}
      <section className="section-padding bg-charcoal border-b border-border">
        <div className="container-corporate">
          <h2 className="font-heading text-3xl text-foreground mb-12">
            Important Disclosures
          </h2>
          <div className="max-w-4xl space-y-8">
            <div className="border border-border p-8">
              <h3 className="font-heading text-xl text-foreground mb-4">
                Investment Risks
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All investments involve risk, including the possible loss of principal. Past performance 
                does not guarantee future results. The value of investments and income from them can go 
                down as well as up. There is no guarantee that any investment strategy will achieve its objectives.
              </p>
            </div>

            <div className="border border-border p-8">
              <h3 className="font-heading text-xl text-foreground mb-4">
                Form ADV
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Canon Capital Partners LLC's Form ADV Part 2A (Brochure) and Part 2B (Brochure Supplement) contain 
                important information about our advisory services, fees, and business practices. 
                Clients and prospective clients may obtain a copy by contacting us or accessing it 
                through the SEC's Investment Adviser Public Disclosure website.
              </p>
            </div>

            <div className="border border-border p-8">
              <h3 className="font-heading text-xl text-foreground mb-4">
                Conflicts of Interest
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Canon Capital Partners LLC maintains comprehensive policies and procedures to identify, disclose, 
                and manage conflicts of interest. Material conflicts are disclosed to clients in our 
                Form ADV and engagement documentation. We are committed to placing client interests first.
              </p>
            </div>

            <div className="border border-border p-8">
              <h3 className="font-heading text-xl text-foreground mb-4">
                Client Complaints
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Clients with concerns or complaints should contact our Chief Compliance Officer at 
                compliance@cannoncapitalpartners.org or in writing at our principal office. We maintain 
                procedures to promptly address and resolve client concerns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="max-w-4xl">
            <h2 className="font-heading text-3xl text-foreground mb-8">
              Compliance Contact
            </h2>
            <div className="border border-border p-8">
              <p className="text-muted-foreground leading-relaxed mb-4">
                For regulatory inquiries, compliance questions, or to request disclosure documents, please contact:
              </p>
              <div className="space-y-2 text-foreground">
                <p><strong>Chief Compliance Officer</strong></p>
                <p>Canon Capital Partners LLC</p>
                <p>280 Park Avenue, 38th Floor</p>
                <p>New York, NY 10017</p>
                <p className="pt-4">
                  <a href="mailto:compliance@cannoncapitalpartners.org" className="text-primary hover:text-gold-muted transition-colors duration-200">
                    compliance@cannoncapitalpartners.org
                  </a>
                </p>
              </div>
            </div>
            </div>

            {/* Sidebar */}
            <PageSidebar variant="general" showServices={false} />
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Compliance;
