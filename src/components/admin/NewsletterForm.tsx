import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { api } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";

interface NewsletterFormProps {
  onSuccess?: () => void;
  subscriberCount?: number;
}

export function NewsletterForm({ onSuccess, subscriberCount }: NewsletterFormProps) {
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!subject.trim() || !content.trim()) {
      toast({
        title: "Validation Error",
        description: "Please fill in both subject and content",
        variant: "destructive",
      });
      return;
    }

    setSending(true);
    try {
      const response = await api.sendNewsletter(subject, content);
      if (response.success && response.data) {
        toast({
          title: "Newsletter Sent!",
          description: `Successfully sent to ${response.data.success} of ${response.data.total} subscribers`,
        });
        setSubject("");
        setContent("");
        if (onSuccess) {
          onSuccess();
        }
      } else {
        throw new Error("Failed to send newsletter");
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to send newsletter",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="subject" className="text-base font-semibold">
          Subject
        </Label>
        <Input
          id="subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Newsletter Subject"
          className="mt-2"
          required
        />
      </div>

      <div>
        <Label htmlFor="content" className="text-base font-semibold">
          Content
        </Label>
        <p className="text-sm text-muted-foreground mt-1 mb-2">
          You can use HTML tags for formatting. The content will be wrapped in the newsletter template.
        </p>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Enter your newsletter content here..."
          className="mt-2 min-h-[300px] font-mono text-sm"
          required
        />
      </div>

      {subscriberCount !== undefined && (
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            This newsletter will be sent to <strong className="text-foreground">{subscriberCount}</strong> subscriber{subscriberCount !== 1 ? 's' : ''}.
          </p>
        </div>
      )}

      <Button
        type="submit"
        disabled={sending}
        className="w-full sm:w-auto"
      >
        {sending ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Sending...
          </>
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Send Newsletter
          </>
        )}
      </Button>
    </form>
  );
}


