import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { SeoManager } from "@/components/common/SeoManager";
import { getSeoForPath } from "@/lib/seo";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const seoConfig = getSeoForPath(location.pathname);

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
