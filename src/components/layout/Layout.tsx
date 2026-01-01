import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { CookieConsent } from "@/components/CookieConsent";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      {/* Header height calculation:
          Mobile: top ribbon (~32px) + nav (80px) = ~112px
          Tablet: top ribbon (~36px) + nav (112px) = ~148px  
          Desktop: top ribbon (~40px) + nav (144px) = ~184px
      */}
      <main className="flex-1 pt-[112px] md:pt-[148px] lg:pt-[184px]">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
