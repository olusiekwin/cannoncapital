import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { AnimatedHero } from "@/components/common/AnimatedHero";
import { api } from "@/lib/api";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    inquiryType: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      const response = await api.submitContact(formData);
      if (response.success) {
        toast({
          title: "Inquiry Received",
          description: "A member of our team will respond within one business day.",
        });
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          company: "",
          inquiryType: "",
          message: "",
        });
      } else {
        throw new Error(response.error || "Failed to submit");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to submit inquiry. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <Layout>
      {/* Hero */}
      <AnimatedHero
        label="Contact"
        title="Begin the Conversation"
        subtitle="We welcome the opportunity to understand your unique circumstances and explore how Canon Capital Partners LLC might serve your objectives."
        backgroundImage="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop"
      />

      {/* Contact Form & Info */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-7">
              <h2 className="font-heading text-2xl lg:text-3xl text-foreground mb-6 lg:mb-8">
                Schedule a Consultation
              </h2>
              <form onSubmit={handleSubmit} className="space-y-5 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200 rounded-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6">
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200 rounded-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200 rounded-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                    Company / Organization
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200 rounded-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                    Area of Interest *
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background border border-border text-foreground focus:border-primary focus:outline-none transition-colors duration-200 appearance-none rounded-sm"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%239ca3af' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`, backgroundPosition: 'right 0.75rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                  >
                    <option value="">Select an option</option>
                    <option value="asset-management">Asset Management</option>
                    <option value="wealth-protection">Wealth Protection</option>
                    <option value="wealth-optimization">Wealth Optimization</option>
                    <option value="project-financing">Project Financing</option>
                    <option value="loan-structuring">Loan Structuring</option>
                    <option value="insurance-risk">Insurance & Risk Strategy</option>
                    <option value="general">General Inquiry</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-body uppercase tracking-wide text-muted-foreground mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="w-full px-4 py-3 bg-background border border-border text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none transition-colors duration-200 resize-none rounded-sm"
                    placeholder="Please share any additional context about your inquiry..."
                  />
                </div>

                <div className="pt-2">
                  <Button type="submit" variant="hero" className="w-full sm:w-auto min-w-[200px]" disabled={submitting}>
                    {submitting ? "Submitting..." : "Submit Inquiry"}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground pt-2">
                  By submitting this form, you agree to our privacy policy. 
                  All information is kept strictly confidential.
                </p>
              </form>
            </div>

            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-6 lg:space-y-8">
              <div className="border border-border p-6 lg:p-8 bg-muted/30">
                <h3 className="font-heading text-xl lg:text-2xl text-foreground mb-5 lg:mb-6">
                  Direct Contact
                </h3>
                <div className="space-y-5">
                  <div>
                    <span className="text-xs font-body uppercase tracking-wide text-muted-foreground block mb-2">
                      Email
                    </span>
                    <a 
                      href="mailto:inquiries@cannoncapitalpartners.org"
                      className="text-foreground hover:text-primary transition-colors duration-200 break-words text-sm lg:text-base"
                    >
                      inquiries@cannoncapitalpartners.org
                    </a>
                  </div>
                  <div>
                    <span className="text-xs font-body uppercase tracking-wide text-muted-foreground block mb-2">
                      Phone
                    </span>
                    <div className="space-y-1.5">
                      <a 
                        href="tel:+254730112028"
                        className="block text-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base"
                      >
                        +254 730 112 028
                      </a>
                      <a 
                        href="tel:+254730112027"
                        className="block text-foreground hover:text-primary transition-colors duration-200 text-sm lg:text-base"
                      >
                        +254 730 112 027
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-border p-6 lg:p-8">
                <h3 className="font-heading text-xl lg:text-2xl text-foreground mb-5 lg:mb-6">
                  Headquarters
                </h3>
                <address className="not-italic text-muted-foreground leading-relaxed text-sm lg:text-base">
                  Canon Capital Partners LLC<br />
                  Delta Corner<br />
                  Westlands, Nairobi, Kenya
                </address>
              </div>

              <div className="p-6 lg:p-8 border-l-4 border-primary bg-primary/5">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Our team responds to all inquiries within one business day. 
                  For urgent matters, please contact us directly by phone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
