import { Layout } from "@/components/layout/Layout";
import { AlertTriangle, Shield, Mail, Phone, Lock } from "lucide-react";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const FraudPrevention = () => {
  return (
    <Layout>
      <section className="py-24 lg:py-32 border-b border-border">
        <div className="container-corporate">
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
            Security & Fraud Prevention
          </span>
          <h1 className="font-heading text-4xl md:text-5xl text-foreground mb-6">
            Protecting Our Clients from Fraud
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl">
            Canon Capital Partners LLC is committed to protecting our clients and their assets. 
            We maintain robust security measures and work proactively to prevent fraud and identity theft.
          </p>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <h2 className="font-heading text-3xl text-foreground mb-12">
            Warning Signs of Fraud
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="border border-border p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
              <h3 className="font-heading text-lg text-foreground mb-3">Unsolicited Contact</h3>
              <p className="text-sm text-muted-foreground">
                Be cautious of unsolicited calls, emails, or messages claiming to be from Canon Capital Partners LLC 
                requesting personal or financial information.
              </p>
            </div>
            <div className="border border-border p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
              <h3 className="font-heading text-lg text-foreground mb-3">Pressure to Act Quickly</h3>
              <p className="text-sm text-muted-foreground">
                Legitimate financial institutions will never pressure you to make immediate decisions or 
                threaten negative consequences for delay.
              </p>
            </div>
            <div className="border border-border p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
              <h3 className="font-heading text-lg text-foreground mb-3">Requests for Payment</h3>
              <p className="text-sm text-muted-foreground">
                We will never ask you to send money via wire transfer, gift cards, cryptocurrency, 
                or other untraceable payment methods.
              </p>
            </div>
            <div className="border border-border p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
              <h3 className="font-heading text-lg text-foreground mb-3">Suspicious Email Addresses</h3>
              <p className="text-sm text-muted-foreground">
                Verify email addresses carefully. Our official domain is @cannoncapitalpartners.org. 
                Be wary of slight variations or free email services.
              </p>
            </div>
            <div className="border border-border p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
              <h3 className="font-heading text-lg text-foreground mb-3">Too Good to Be True</h3>
              <p className="text-sm text-muted-foreground">
                Be skeptical of investment opportunities promising guaranteed returns, 
                unusually high returns, or "risk-free" investments.
              </p>
            </div>
            <div className="border border-border p-6">
              <AlertTriangle className="w-8 h-8 text-primary mb-4" strokeWidth={1} />
              <h3 className="font-heading text-lg text-foreground mb-3">Identity Verification Requests</h3>
              <p className="text-sm text-muted-foreground">
                We will never ask for your password, PIN, or full Social Security number via email or phone. 
                Always verify the identity of the person you're speaking with.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security Measures */}
      <section className="section-padding bg-charcoal border-b border-border">
        <div className="container-corporate">
          <h2 className="font-heading text-3xl text-foreground mb-12">
            Our Security Measures
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="border border-border p-8">
              <Shield className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-4">
                Secure Communications
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All sensitive communications are encrypted. We use secure channels for transmitting 
                confidential information and never request sensitive data via unsecured email.
              </p>
            </div>
            <div className="border border-border p-8">
              <Lock className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-4">
                Client Verification
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We maintain strict identity verification procedures for all account changes, 
                transactions, and requests. Multiple verification steps protect your account.
              </p>
            </div>
            <div className="border border-border p-8">
              <Shield className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-4">
                Regular Monitoring
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our systems continuously monitor for suspicious activity and potential fraud. 
                We review transactions and account changes in real-time.
              </p>
            </div>
            <div className="border border-border p-8">
              <Lock className="w-10 h-10 text-primary mb-6" strokeWidth={1} />
              <h3 className="font-heading text-xl text-foreground mb-4">
                Staff Training
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                All staff members receive comprehensive training on fraud prevention, 
                security protocols, and how to identify and respond to suspicious activity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What to Do */}
      <section className="section-padding border-b border-border">
        <div className="container-corporate">
          <h2 className="font-heading text-3xl text-foreground mb-12">
            If You Suspect Fraud
          </h2>
          <div className="max-w-4xl space-y-6">
            <div className="border-l-4 border-primary pl-6 py-4">
              <h3 className="font-heading text-xl text-foreground mb-3">
                1. Contact Us Immediately
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                If you receive suspicious communications claiming to be from Canon Capital Partners LLC, 
                or if you believe your account may have been compromised, contact us immediately using 
                the verified contact information below.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6 py-4">
              <h3 className="font-heading text-xl text-foreground mb-3">
                2. Do Not Provide Information
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Do not provide any personal or financial information to the suspicious party. 
                Do not click on links or download attachments from suspicious emails.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6 py-4">
              <h3 className="font-heading text-xl text-foreground mb-3">
                3. Report to Authorities
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Report the incident to your local law enforcement and relevant financial regulatory authorities. 
                In the United States, you can report to the Federal Trade Commission (FTC) and the SEC.
              </p>
            </div>
            <div className="border-l-4 border-primary pl-6 py-4">
              <h3 className="font-heading text-xl text-foreground mb-3">
                4. Monitor Your Accounts
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Regularly review your account statements and transaction history. 
                Report any unauthorized transactions immediately.
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
                Verified Contact Information
              </h2>
              <div className="space-y-6">
                <div className="border border-border p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Mail className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-2">Email</h3>
                      <p className="text-muted-foreground mb-2">
                        For fraud-related concerns, use our secure contact form or email:
                      </p>
                      <a 
                        href="mailto:security@cannoncapitalpartners.org" 
                        className="text-primary hover:text-gold-muted transition-colors duration-200 break-all"
                      >
                        security@cannoncapitalpartners.org
                      </a>
                    </div>
                  </div>
                </div>
                <div className="border border-border p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <Phone className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-heading text-lg text-foreground mb-2">Phone</h3>
                      <p className="text-muted-foreground mb-2">
                        Call us during business hours (Monday-Friday, 9:00 AM - 5:00 PM EST):
                      </p>
                      <div className="space-y-1">
                        <a 
                          href="tel:+254730112028" 
                          className="text-primary hover:text-gold-muted transition-colors duration-200 block"
                        >
                          +254 730 112 028
                        </a>
                        <a 
                          href="tel:+254730112027" 
                          className="text-primary hover:text-gold-muted transition-colors duration-200 block"
                        >
                          +254 730 112 027
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-muted/30 border border-border p-6">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    <strong>Important:</strong> Always verify the identity of anyone claiming to represent 
                    Canon Capital Partners LLC. You can verify our official contact information on this website 
                    or by contacting us through our official channels. When in doubt, hang up and call us directly 
                    using a number you have verified.
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

export default FraudPrevention;

