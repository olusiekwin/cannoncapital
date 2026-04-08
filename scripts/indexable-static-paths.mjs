/**
 * Public indexable paths — keep aligned with src/App.tsx:
 * every <Route> that is not /admin, not *, and not a :slug/:id pattern.
 * Do not add /admin (noindex). Do not add fragments (#).
 */
export const INDEXABLE_STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.9" },
  { path: "/services", changefreq: "weekly", priority: "0.9" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/insights", changefreq: "weekly", priority: "0.9" },
  { path: "/impact", changefreq: "weekly", priority: "0.9" },
  { path: "/donate", changefreq: "monthly", priority: "0.85" },
  { path: "/contact", changefreq: "monthly", priority: "0.85" },
  { path: "/careers", changefreq: "weekly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/privacy", changefreq: "yearly", priority: "0.4" },
  { path: "/terms", changefreq: "yearly", priority: "0.4" },
  { path: "/compliance", changefreq: "yearly", priority: "0.4" },
  { path: "/fraud-prevention", changefreq: "yearly", priority: "0.4" },
];
