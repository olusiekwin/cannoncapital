import { Layout } from "@/components/layout/Layout";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { PageSidebar } from "@/components/services/ServicesSidebar";

const faqCategories = [
  {
    title: "General Questions",
    questions: [
      {
        question: "What types of clients does Canon Capital Partners LLC serve?",
        answer: "We serve high-net-worth individuals, family offices, corporations, and institutional investors seeking sophisticated financial advisory services. Our typical client relationships involve significant assets and complex financial situations that benefit from institutional-grade advice."
      },
      {
        question: "What is the minimum relationship size?",
        answer: "While we evaluate each potential relationship individually, our advisory services are generally most appropriate for clients with $5 million or more in investable assets. For certain specialized services such as project financing, minimum thresholds may differ."
      },
      {
        question: "How is Canon Capital Partners LLC compensated?",
        answer: "Our compensation varies by service. Wealth management services typically involve asset-based fees. Project financing and transaction advisory may involve success-based fees. We provide transparent fee schedules and always disclose our compensation structure before engagement."
      },
      {
        question: "Is Canon Capital Partners LLC a fiduciary?",
        answer: "Yes, we operate as a fiduciary for our investment advisory clients, meaning we are legally obligated to act in their best interests. This fiduciary standard guides all our recommendations and advice."
      }
    ]
  },
  {
    title: "Services & Process",
    questions: [
      {
        question: "How does the engagement process begin?",
        answer: "Every relationship begins with an introductory conversation to understand your circumstances and objectives. If there's mutual interest, we proceed to a comprehensive discovery process, followed by a proposal outlining our recommended approach and terms."
      },
      {
        question: "Can I engage Canon Capital Partners LLC for a single service?",
        answer: "Yes, while many clients utilize multiple services, we offer each service area independently. You might engage us solely for project financing advisory, for example, without utilizing wealth management services."
      },
      {
        question: "How frequently will I communicate with my advisor?",
        answer: "Communication frequency is tailored to your preferences. Most clients have quarterly reviews at minimum, with ad-hoc communication as needed. VIP clients benefit from more frequent touchpoints and priority responsiveness."
      },
      {
        question: "Do you work with my existing advisors?",
        answer: "Absolutely. We believe in collaborative advice and regularly coordinate with clients' attorneys, accountants, and other professional advisors to ensure integrated planning and execution."
      }
    ]
  },
  {
    title: "Legal & Compliance",
    questions: [
      {
        question: "Is my information kept confidential?",
        answer: "Client confidentiality is paramount. We maintain strict data security protocols, limit access to client information on a need-to-know basis, and never share client information without explicit consent, except as required by law."
      },
      {
        question: "What regulatory oversight applies to Canon Capital Partners LLC?",
        answer: "Canon Capital Partners LLC is registered as an investment advisor and subject to applicable securities regulations. We maintain robust compliance programs, undergo regular audits, and adhere to all applicable regulatory requirements."
      },
      {
        question: "How are conflicts of interest managed?",
        answer: "We maintain comprehensive conflict of interest policies and disclose any material conflicts to clients. Our fiduciary duty requires us to prioritize client interests, and we have procedures to identify, manage, and disclose potential conflicts."
      },
      {
        question: "What happens to my relationship if I move to another country?",
        answer: "We serve clients globally and can typically maintain relationships across jurisdictions. However, regulatory requirements vary by country, and some adjustments may be necessary. We work with clients through transitions to ensure continuity of service."
      }
    ]
  }
];

const FAQ = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggleItem = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 lg:py-32 border-b border-border">
        <div className="container-corporate">
          <div className="max-w-3xl">
            <span className="text-xs font-body uppercase tracking-[0.3em] text-primary mb-6 block">
              Support
            </span>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Answers to common questions about our services, process, and how we work with clients.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="section-padding">
        <div className="container-corporate">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-16">
            <div className="max-w-4xl">
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.title} className={categoryIndex > 0 ? "mt-16" : ""}>
                <h2 className="font-heading text-2xl text-foreground mb-8 pb-4 border-b border-border">
                  {category.title}
                </h2>
                <div className="space-y-0">
                  {category.questions.map((item, index) => {
                    const itemId = `${categoryIndex}-${index}`;
                    const isOpen = openItems[itemId];
                    return (
                      <div key={itemId} className="border-b border-border">
                        <button
                          onClick={() => toggleItem(itemId)}
                          className="w-full py-6 flex items-start justify-between gap-4 text-left group"
                        >
                          <span className="font-heading text-lg text-foreground group-hover:text-primary transition-colors duration-200">
                            {item.question}
                          </span>
                          <ChevronDown 
                            className={cn(
                              "w-5 h-5 text-muted-foreground flex-shrink-0 transition-transform duration-200",
                              isOpen && "rotate-180"
                            )} 
                          />
                        </button>
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-200",
                            isOpen ? "max-h-96 pb-6" : "max-h-0"
                          )}
                        >
                          <p className="text-muted-foreground leading-relaxed pr-12">
                            {item.answer}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          ))}
            </div>

            {/* Sidebar */}
            <PageSidebar variant="general" showServices={false} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-charcoal border-t border-border">
        <div className="container-corporate text-center">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
            Still Have Questions?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto mb-8">
            Our team is ready to provide the answers you need. Contact us directly for personalized assistance.
          </p>
          <a href="/contact">
            <button className="px-8 py-4 bg-primary text-primary-foreground text-sm font-body uppercase tracking-widest hover:bg-primary/80 transition-colors duration-200">
              Contact Us
            </button>
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default FAQ;
