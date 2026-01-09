import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Mail, Shield } from "lucide-react";

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"email" | "otp">("email");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleRequestOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.requestOTP(email);
      
      if (response.success) {
        toast({
          title: "OTP Sent",
          description: response.message || "Please check your email for the OTP code",
        });
        setStep("otp");
      } else {
        toast({
          title: "Request Failed",
          description: response.error || "Failed to request OTP",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Request Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.verifyOTP(email, otp);
      
      if (response.success) {
        toast({
          title: "Login Successful",
          description: "Welcome to the admin panel",
        });
        onLoginSuccess();
      } else {
        toast({
          title: "Verification Failed",
          description: response.error || "Invalid OTP",
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Verification Failed",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30">
      <div className="w-full max-w-md">
        <div className="bg-white border border-border p-8 shadow-lg">
          <div className="text-center mb-8">
            <h1 className="font-heading text-3xl text-foreground mb-2">
              Admin Login
            </h1>
            <p className="text-muted-foreground">
              {step === "email" 
                ? "Enter your email address to receive an OTP"
                : "Enter the OTP sent to your email"}
            </p>
          </div>

          {step === "email" ? (
            <form onSubmit={handleRequestOTP} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value.toLowerCase())}
                    required
                    className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email address"
                  />
                </div>
              </div>

              <Button
                type="submit"
                variant="hero"
                className="w-full"
                disabled={loading}
              >
                {loading ? "Sending OTP..." : "Send OTP"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOTP} className="space-y-6">
              <div className="p-4 bg-muted/30 border border-border rounded">
                <p className="text-sm text-muted-foreground text-center">
                  An OTP has been sent to your registered email address. Please check your inbox.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  One-Time Password (OTP)
                </label>
                <div className="relative">
                  <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    required
                    maxLength={6}
                    className="w-full pl-10 pr-4 py-3 border border-border focus:outline-none focus:ring-2 focus:ring-primary text-center text-2xl tracking-widest font-mono"
                    placeholder="000000"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Enter the 6-digit code from your email
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => {
                    setStep("email");
                    setOtp("");
                  }}
                  disabled={loading}
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="hero"
                  className="flex-1"
                  disabled={loading || otp.length !== 6}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

