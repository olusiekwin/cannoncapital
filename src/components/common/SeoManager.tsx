import { useEffect } from "react";
import { buildAbsoluteUrl, getBaseUrl, getDocumentTitle, SeoConfig } from "@/lib/seo";

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

  const url = buildAbsoluteUrl(config.path);
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CannonCapital",
    url: getBaseUrl(),
    logo: config.image,
    sameAs: [],
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: config.title,
    description: config.description,
    url,
  };

  script.textContent = JSON.stringify([organizationSchema, webPageSchema]);
};

export function SeoManager({ config }: SeoManagerProps) {
  useEffect(() => {
    const absoluteUrl = buildAbsoluteUrl(config.path);
    const image = config.image || buildAbsoluteUrl("/og-image.png");
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

    setMetaTag("twitter:card", "summary_large_image");
    setMetaTag("twitter:title", getDocumentTitle(config.title));
    setMetaTag("twitter:description", config.description);
    setMetaTag("twitter:image", image);

    setCanonical(absoluteUrl);
    setJsonLd(config);
  }, [config]);

  return null;
}
