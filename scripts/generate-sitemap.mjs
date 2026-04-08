/**
 * Builds public/sitemap.xml from static routes + live API (published content).
 * Env:
 *   SITEMAP_SITE_URL  — site origin (default https://cannoncapitalpartners.org)
 *   SITEMAP_API_BASE  — API root with /api suffix (default https://cannoncapital.onrender.com/api)
 *   SKIP_SITEMAP_FETCH — if "1", only static URLs (offline / CI without API)
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { INDEXABLE_STATIC_ROUTES } from "./indexable-static-paths.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "sitemap.xml");

const SITE = (process.env.SITEMAP_SITE_URL || "https://cannoncapitalpartners.org").replace(/\/$/, "");
const API = (process.env.SITEMAP_API_BASE || "https://cannoncapital.onrender.com/api").replace(/\/$/, "");
const SKIP = process.env.SKIP_SITEMAP_FETCH === "1";

function escapeXml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function loc(path) {
  const p = path.startsWith("/") ? path : `/${path}`;
  return `${SITE}${p}`;
}

function lastmodFrom(item) {
  const raw = item?.updatedAt || item?.updated_at || item?.createdAt || item?.created_at;
  if (!raw) return "";
  const t = Date.parse(raw);
  if (Number.isNaN(t)) return "";
  return new Date(t).toISOString().slice(0, 10);
}

function urlEntry(href, opts = {}) {
  const { changefreq = "weekly", priority = "0.8", lastmod = "" } = opts;
  let body = `  <url><loc>${escapeXml(href)}</loc>`;
  if (lastmod) body += `<lastmod>${escapeXml(lastmod)}</lastmod>`;
  body += `<changefreq>${changefreq}</changefreq><priority>${priority}</priority></url>\n`;
  return body;
}

/** Merge arrays; later items skip if same key already seen. */
function mergeByKey(items, keyFn) {
  const map = new Map();
  for (const item of items) {
    const k = keyFn(item);
    if (!k || map.has(k)) continue;
    map.set(k, item);
  }
  return [...map.values()];
}

async function fetchList(endpoint) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) throw new Error(`${endpoint} HTTP ${res.status}`);
  const json = await res.json();
  if (!json.success || !Array.isArray(json.data)) return [];
  return json.data;
}

/** Try primary endpoint, then fallback (e.g. /published vs default published filter). */
async function fetchListWithFallback(primary, fallback) {
  try {
    const rows = await fetchList(primary);
    if (rows.length > 0) return rows;
  } catch {
    /* try fallback */
  }
  try {
    return await fetchList(fallback);
  } catch {
    return [];
  }
}

async function loadDynamicUrls() {
  if (SKIP) {
    console.warn("Sitemap: SKIP_SITEMAP_FETCH=1 — dynamic URLs omitted.");
    return [];
  }

  const [articles, services, projects, impact] = await Promise.all([
    fetchListWithFallback("/articles/published", "/articles"),
    fetchListWithFallback("/services/published", "/services"),
    fetchList("/projects").catch(() => []),
    fetchListWithFallback("/impact/published", "/impact"),
  ]);

  const rows = [];

  for (const a of mergeByKey([...articles], (x) => x?.slug)) {
    if (a?.published === false || !a?.slug) continue;
    rows.push({
      href: loc(`/insights/${encodeURIComponent(a.slug)}`),
      changefreq: "monthly",
      priority: "0.75",
      lastmod: lastmodFrom(a),
    });
  }

  for (const s of mergeByKey([...services], (x) => x?.slug)) {
    if (s?.published === false || !s?.slug) continue;
    rows.push({
      href: loc(`/services/${encodeURIComponent(s.slug)}`),
      changefreq: "monthly",
      priority: "0.8",
      lastmod: lastmodFrom(s),
    });
  }

  for (const p of mergeByKey([...projects], (x) => x?.id)) {
    if (p?.published === false || !p?.id) continue;
    rows.push({
      href: loc(`/projects/${encodeURIComponent(p.id)}`),
      changefreq: "monthly",
      priority: "0.75",
      lastmod: lastmodFrom(p),
    });
  }

  for (const story of mergeByKey([...impact], (x) => x?.id)) {
    if (story?.published === false || !story?.id) continue;
    rows.push({
      href: loc(`/impact/${encodeURIComponent(story.id)}`),
      changefreq: "monthly",
      priority: "0.72",
      lastmod: lastmodFrom(story),
    });
  }

  return rows;
}

async function main() {
  let dynamic = [];
  try {
    dynamic = await loadDynamicUrls();
    if (!SKIP && dynamic.length === 0) {
      console.warn("Sitemap: API returned no dynamic URLs (check SITEMAP_API_BASE or DB).");
    } else if (!SKIP) {
      console.log(`Sitemap: added ${dynamic.length} URLs from API.`);
    }
  } catch (e) {
    console.warn("Sitemap: API fetch failed, static URLs only:", e.message || e);
  }

  const seen = new Set();
  const lines = ['<?xml version="1.0" encoding="UTF-8"?>\n'];
  lines.push('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n');

  for (const p of INDEXABLE_STATIC_ROUTES) {
    const href = loc(p.path);
    if (seen.has(href)) continue;
    seen.add(href);
    lines.push(urlEntry(href, { changefreq: p.changefreq, priority: p.priority }));
  }

  dynamic.sort((a, b) => a.href.localeCompare(b.href));
  for (const d of dynamic) {
    if (seen.has(d.href)) continue;
    seen.add(d.href);
    lines.push(urlEntry(d.href, d));
  }

  lines.push("</urlset>\n");
  writeFileSync(OUT, lines.join(""), "utf8");
  console.log(`Sitemap: wrote ${seen.size} URLs to public/sitemap.xml`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
