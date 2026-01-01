import { Layout } from "@/components/layout/Layout";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <section className="py-24 lg:py-32 border-b border-border">
        <div className="container-corporate">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Legal
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Privacy Policy
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
                  1. Introduction
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Canon Capital Partners LLC ("Canon Capital Partners LLC," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you engage with our services or visit our website.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  By engaging our services or accessing our website, you consent to the practices described in this Privacy Policy. If you do not agree with the terms of this policy, please do not access our website or engage our services.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  2. Information We Collect
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We collect information you provide directly to us, including:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Personal identification information (name, email address, phone number, mailing address)</li>
                  <li>Financial information necessary for our advisory services</li>
                  <li>Information about your investment objectives and risk tolerance</li>
                  <li>Government-issued identification for regulatory compliance</li>
                  <li>Communications you send to us</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  3. How We Use Your Information
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We use the information we collect to:
                </p>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Provide, maintain, and improve our services</li>
                  <li>Comply with legal and regulatory requirements</li>
                  <li>Communicate with you about our services</li>
                  <li>Respond to your inquiries and provide customer support</li>
                  <li>Protect against fraudulent or illegal activity</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  4. Information Sharing
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share your information with third parties only in the following circumstances: with your consent, to comply with legal obligations, to protect our rights, with service providers who assist in our operations, or in connection with a business transaction such as a merger or acquisition.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  5. Data Security
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is completely secure, and we cannot guarantee absolute security.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  6. Your Rights
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  Depending on your jurisdiction, you may have certain rights regarding your personal information, including the right to access, correct, delete, or port your data. To exercise these rights, please contact us using the information provided below.
                </p>
              </div>

              <div>
                <h2 className="font-heading text-2xl text-foreground mb-4">
                  7. Contact Us
                </h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have questions about this Privacy Policy or our privacy practices, please contact us at: privacy@cannoncapitalpartners.org or by mail at Canon Capital Partners LLC, 280 Park Avenue, 38th Floor, New York, NY 10017.
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

export default PrivacyPolicy;
