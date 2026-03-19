export interface SeoConfig {
  title: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  robots?: string;
}

const SITE_NAME = "CannonCapital";
const BASE_URL = "https://cannoncapitalpartners.org";
const DEFAULT_IMAGE = "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&auto=format&fit=crop";

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
    title: "Strategic Financial Advisory",
    description:
      "Financial clarity, strategic protection, and confident growth across wealth, assets, and structured finance.",
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
    title: "Impact",
    description:
      "See how CannonCapital drives measurable economic and social impact through strategic advisory work.",
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
];

export const getBaseUrl = (): string => BASE_URL;

export const buildAbsoluteUrl = (path: string): string => {
  return new URL(path || "/", BASE_URL).toString();
};

export const getSeoForPath = (pathname: string): SeoConfig => {
  const normalizedPath = pathname || "/";
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
