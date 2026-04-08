import { ReactNode, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { SeoManager } from "@/components/common/SeoManager";
import { getSeoForPath, SeoConfig } from "@/lib/seo";

interface LayoutProps {
  children: ReactNode;
  /** Merged over route defaults (e.g. loaded article or impact story). */
  seo?: Partial<SeoConfig>;
}

export function Layout({ children, seo }: LayoutProps) {
  const location = useLocation();
  const seoConfig = useMemo((): SeoConfig => {
    const base = getSeoForPath(location.pathname);
    if (!seo) return base;
    return { ...base, ...seo, path: base.path };
  }, [location.pathname, seo]);

  return (
    <div className="min-h-screen flex flex-col">
      <SeoManager config={seoConfig} />
      <Header />
      <main className="flex-1 pt-28 lg:pt-32">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
