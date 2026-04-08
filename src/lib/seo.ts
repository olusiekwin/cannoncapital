export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
  /** ISO 8601 when available (structured data) */
  datePublished?: string;
  authorName?: string;
}

/** Trim plain text for meta descriptions (no HTML). */
export const truncateForMetaDescription = (text: string, maxLen = 160): string => {
  const single = text.replace(/\s+/g, " ").trim();
  if (single.length <= maxLen) return single;
  return `${single.slice(0, maxLen - 1).trimEnd()}…`;
};

const SITE_NAME = "CannonCapital";
const BASE_URL = "https://cannoncapitalpartners.org";
const DEFAULT_IMAGE = `${BASE_URL}/og-image.svg`;

const defaultConfig: SeoConfig = {
  title: "Strategic Financial Advisory",
  description:
    "CannonCapital provides institutional-grade financial advisory services including asset management, wealth protection, project financing, and strategic planning.",
  path: "/",
  image: DEFAULT_IMAGE,
  type: "website",
  robots: "index,follow",
};

const pageConfigs: Record<string, Partial<SeoConfig>> = {
  "/": {
    title: "Project Finance & Strategic Advisory",
    description:
      "Connect projects with strategic capital: project finance, structured finance, development finance, and capital mobilization—plus institutional advisory, wealth protection, and ESG-aligned financing from CannonCapital.",
  },
  "/services": {
    title: "Financial Advisory Services",
    description:
      "Explore CannonCapital services across project finance, asset management, risk planning, and institutional advisory.",
  },
  "/about": {
    title: "About CannonCapital",
    description:
      "Meet the advisory team and approach behind CannonCapital's strategic financial consulting.",
  },
  "/insights": {
    title: "Insights & Analysis",
    description:
      "Read market perspectives, strategic commentary, and actionable financial insights from CannonCapital.",
  },
  "/projects": {
    title: "Projects & Case Studies",
    description:
      "Review CannonCapital projects and case studies across infrastructure, real estate, and strategic finance.",
  },
  "/contact": {
    title: "Contact CannonCapital",
    description:
      "Speak with CannonCapital's advisory team about your financial strategy and project financing needs.",
  },
  "/faq": {
    title: "Frequently Asked Questions",
    description:
      "Find answers to common questions about CannonCapital services, process, and advisory engagements.",
  },
  "/careers": {
    title: "Careers",
    description:
      "Join CannonCapital and help build high-impact financial advisory solutions for institutional clients.",
  },
  "/impact": {
    title: "Impact & Impact Stories",
    description:
      "Explore CannonCapital impact stories across housing, clean energy, community infrastructure, and ESG—measurable outcomes from strategic advisory and development finance.",
  },
  "/donate": {
    title: "Support Our Mission",
    description:
      "Learn how to partner with CannonCapital through philanthropic giving and mission-aligned donations that amplify sustainable finance and community impact.",
  },
  "/privacy": {
    title: "Privacy Policy",
    description:
      "Review CannonCapital's privacy policy and how we handle and protect your data.",
  },
  "/terms": {
    title: "Terms of Service",
    description:
      "Read CannonCapital's terms and conditions for using our website and services.",
  },
  "/compliance": {
    title: "Compliance",
    description:
      "Learn about CannonCapital's compliance standards and governance framework.",
  },
  "/fraud-prevention": {
    title: "Fraud Prevention",
    description:
      "Understand CannonCapital's fraud prevention guidance and client security best practices.",
  },
};

const dynamicRoutePatterns: Array<{
  regex: RegExp;
  config: Partial<SeoConfig>;
}> = [
  {
    regex: /^\/services\/[^/]+$/,
    config: {
      title: "Service Details",
      description:
        "Detailed overview of CannonCapital's advisory service capabilities and engagement approach.",
    },
  },
  {
    regex: /^\/insights\/[^/]+$/,
    config: {
      title: "Insight Article",
      description:
        "Read this CannonCapital insight article for practical perspectives on finance and strategy.",
      type: "article",
    },
  },
  {
    regex: /^\/projects\/[^/]+$/,
    config: {
      title: "Project Case Study",
      description:
        "Explore this CannonCapital project case study, including strategy, delivery, and outcomes.",
    },
  },
  {
    regex: /^\/impact\/[^/]+$/,
    config: {
      title: "Impact Story",
      description:
        "Read a CannonCapital impact story: outcomes, metrics, and community transformation through strategic finance.",
      type: "article",
    },
  },
];

export const getBaseUrl = (): string => BASE_URL;

export const buildAbsoluteUrl = (path: string): string => {
  return new URL(path || "/", BASE_URL).toString();
};

export const getSeoForPath = (pathname: string): SeoConfig => {
  const normalizedPath = pathname || "/";

  if (normalizedPath === "/admin" || normalizedPath.startsWith("/admin/")) {
    return {
      ...defaultConfig,
      title: "Admin",
      description: "Internal administration for CannonCapital.",
      path: normalizedPath,
      robots: "noindex,nofollow",
    };
  }

  const staticConfig = pageConfigs[normalizedPath];

  if (staticConfig) {
    return {
      ...defaultConfig,
      ...staticConfig,
      path: normalizedPath,
    };
  }

  const dynamicMatch = dynamicRoutePatterns.find((item) =>
    item.regex.test(normalizedPath),
  );

  if (dynamicMatch) {
    return {
      ...defaultConfig,
      ...dynamicMatch.config,
      path: normalizedPath,
    };
  }

  return {
    ...defaultConfig,
    title: "Page Not Found",
    description:
      "The page you are looking for could not be found. Explore CannonCapital's advisory services and insights.",
    path: normalizedPath,
    robots: "noindex,follow",
  };
};

export const getDocumentTitle = (title: string): string =>
  `${title} | ${SITE_NAME}`;
