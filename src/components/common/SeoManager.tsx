import { useEffect } from "react";
import {
  buildAbsoluteUrl,
  getBaseUrl,
  getDocumentTitle,
  getSeoForPath,
  SeoConfig,
} from "@/lib/seo";

interface SeoManagerProps {
  config: SeoConfig;
}

const setMetaTag = (name: string, content: string, isProperty = false): void => {
  const selector = isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`;
  let tag = document.querySelector(selector) as HTMLMetaElement | null;

  if (!tag) {
    tag = document.createElement("meta");
    if (isProperty) {
      tag.setAttribute("property", name);
    } else {
      tag.setAttribute("name", name);
    }
    document.head.appendChild(tag);
  }

  tag.setAttribute("content", content);
};

const setCanonical = (href: string): void => {
  let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;

  if (!canonical) {
    canonical = document.createElement("link");
    canonical.setAttribute("rel", "canonical");
    document.head.appendChild(canonical);
  }

  canonical.setAttribute("href", href);
};

const setJsonLd = (config: SeoConfig): void => {
  const scriptId = "site-json-ld";
  let script = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement("script");
    script.id = scriptId;
    script.type = "application/ld+json";
    document.head.appendChild(script);
  }

  const base = getBaseUrl();
  const url = buildAbsoluteUrl(config.path);
  const pageImage = config.image || buildAbsoluteUrl("/og-image.svg");
  const orgLogo = buildAbsoluteUrl("/logo.svg");
  const siteWideDescription = getSeoForPath("/").description;

  const orgId = `${base}/#organization`;
  const websiteId = `${base}/#website`;
  const webPageId = `${url}#webpage`;

  const organization = {
    "@type": "Organization",
    "@id": orgId,
    name: "CannonCapital",
    url: base,
    logo: {
      "@type": "ImageObject",
      url: orgLogo,
    },
    sameAs: [] as string[],
  };

  const website = {
    "@type": "WebSite",
    "@id": websiteId,
    name: "CannonCapital",
    url: `${base}/`,
    description: siteWideDescription,
    inLanguage: "en-US",
    publisher: { "@id": orgId },
  };

  const webPage: Record<string, unknown> = {
    "@type": "WebPage",
    "@id": webPageId,
    url,
    name: config.title,
    description: config.description,
    isPartOf: { "@id": websiteId },
    about: { "@id": orgId },
  };

  const graph: Record<string, unknown>[] = [organization, website, webPage];

  if (config.type === "article") {
    const article: Record<string, unknown> = {
      "@type": "Article",
      headline: config.title,
      description: config.description,
      image: pageImage,
      url,
      mainEntityOfPage: { "@id": webPageId },
      publisher: {
        "@type": "Organization",
        name: "CannonCapital",
        logo: {
          "@type": "ImageObject",
          url: orgLogo,
        },
      },
    };
    if (config.datePublished) {
      article.datePublished = config.datePublished;
    }
    if (config.authorName) {
      article.author = {
        "@type": "Person",
        name: config.authorName,
      };
    }
    graph.push(article);
  }

  script.textContent = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  });
};

export function SeoManager({ config }: SeoManagerProps) {
  useEffect(() => {
    const absoluteUrl = buildAbsoluteUrl(config.path);
    const image = config.image || buildAbsoluteUrl("/og-image.svg");
    const type = config.type || "website";
    const robots = config.robots || "index,follow";

    document.title = getDocumentTitle(config.title);

    setMetaTag("description", config.description);
    setMetaTag("robots", robots);

    setMetaTag("og:title", getDocumentTitle(config.title), true);
    setMetaTag("og:description", config.description, true);
    setMetaTag("og:type", type, true);
    setMetaTag("og:url", absoluteUrl, true);
    setMetaTag("og:site_name", "CannonCapital", true);
    setMetaTag("og:image", image, true);
    setMetaTag("og:image:alt", `${config.title} — CannonCapital`, true);
    setMetaTag("og:locale", "en_US", true);

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", getDocumentTitle(config.title));
    setMetaTag("twitter:description", config.description);
    setMetaTag("twitter:image", image);
    setMetaTag("twitter:image:alt", `${config.title} — CannonCapital`);

    setCanonical(absoluteUrl);
    setJsonLd(config);
  }, [config]);

  return null;
}
