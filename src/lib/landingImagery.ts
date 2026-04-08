/**
 * Homepage imagery aligned with advisory positioning: project finance, capital mobilization,
 * infrastructure, institutional markets, and ESG — supports consistent alt text for a11y and relevance.
 */
export const landingImagery = {
  hero: {
    // Verified HTTP 200 via images.unsplash.com (some legacy photo IDs now 404)
    src: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2400&q=80&auto=format&fit=crop",
    alt: "Urban skyline representing global capital markets and institutional finance partnerships",
  },
  about: {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop",
    alt: "Advisory professionals discussing project finance and structured capital for sponsors and investors",
  },
  servicesBand: {
    src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2400&auto=format&fit=crop",
    alt: "Financial analytics and strategy visualization supporting structured finance and advisory workflows",
  },
  projectsBand: {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2400&auto=format&fit=crop",
    alt: "Major infrastructure and construction development enabled by project finance and capital mobilization",
  },
  statsBackdrop: {
    src: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2400&auto=format&fit=crop",
  },
  insightsBand: {
    src: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2400&auto=format&fit=crop",
    alt: "Market news and research context for institutional insights and strategic commentary",
  },
  ctaSlides: [
    {
      src: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2000&auto=format&fit=crop",
      alt: "Executive boardroom setting for financial advisory and capital structuring conversations",
    },
    {
      src: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=2000&auto=format&fit=crop",
      alt: "Renewable energy infrastructure reflecting ESG-aligned and development finance priorities",
    },
    {
      src: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
      alt: "Team reviewing financial models for investor readiness and complex transactions",
    },
  ],
} as const;
