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
      {/* Header height: top bar (~50px on mobile when wrapped, ~40px desktop) + nav (128px mobile, 144px desktop) = ~178px mobile, ~184px desktop */}
      <main className="flex-1 pt-[178px] md:pt-[168px] lg:pt-[184px]">
        {children}
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
