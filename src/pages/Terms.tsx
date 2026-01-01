import { Layout } from "@/components/layout/Layout";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const Terms = () => {
  return (
    <Layout>
      <section className="py-24 lg:py-32 border-b border-border">
        <div className="container-corporate">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Legal
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Terms & Conditions
          </h1>
          <p className="text-muted-foreground">
            Last updated: December 2024
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="max-w-4xl">
            <div className="space-y-12">
              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  1. Acceptance of Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using the Canon Capital Partners LLC website and services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not access or use our services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  2. Description of Services
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Canon Capital Partners LLC provides financial advisory services including asset management, wealth protection, wealth management, project financing, loan structuring, and insurance planning. Specific services are provided pursuant to separate engagement agreements that govern the terms of those relationships.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  3. No Investment Advice
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  The information provided on this website is for general informational purposes only and does not constitute investment advice, financial advice, or any other type of advice. You should consult with qualified professionals before making any investment decisions.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  4. No Guarantees
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Past performance is not indicative of future results. Investment involves risk, including the possible loss of principal. Canon Capital Partners LLC makes no guarantees regarding the performance of any investment or the success of any advisory engagement.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  5. Intellectual Property
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  All content on this website, including text, graphics, logos, and images, is the property of Canon Capital Partners LLC and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  6. Limitation of Liability
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  To the fullest extent permitted by law, Canon Capital Partners LLC shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  7. Governing Law
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms and Conditions shall be governed by and construed in accordance with the laws of the State of New York, without regard to its conflict of law provisions.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  8. Changes to Terms
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the new terms on this page. Your continued use of our services after any changes constitutes acceptance of the modified terms.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  9. Contact Information
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions regarding these Terms and Conditions, please contact us at: legal@cannoncapitalpartners.org or by mail at Canon Capital Partners LLC, 280 Park Avenue, 38th Floor, New York, NY 10017.
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

export default Terms;
