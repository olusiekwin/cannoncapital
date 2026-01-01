import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 lg:p-6 animate-fade-in">
      <div className="container-corporate">
        <div className="bg-white border border-border p-6 lg:p-8 shadow-lg max-w-4xl mx-auto transition-all duration-300">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-6">
            <div className="flex-1 space-y-2">
              <h3 className="font-heading text-lg font-semibold text-foreground">
                Cookie Preferences
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We use cookies to enhance your browsing experience, analyze site traffic, and personalize content. 
                By clicking "Accept All", you consent to our use of cookies. You can also choose to reject non-essential cookies.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Button
                onClick={handleReject}
                variant="outline"
                size="sm"
                className="uppercase tracking-wide"
              >
                Reject
              </Button>
              <Button
                onClick={handleAccept}
                variant="hero"
                size="sm"
                className="uppercase tracking-wide"
              >
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

