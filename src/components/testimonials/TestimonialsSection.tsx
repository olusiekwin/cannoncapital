import { useEffect, useState } from "react";
import { api } from "@/lib/api";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);

  useEffect(() => {
    loadTestimonials();
  }, []);

  const loadTestimonials = async () => {
    try {
      const response = await api.getApprovedTestimonials();
      if (response.success && response.data) {
        setTestimonials(response.data);
      }
    } catch (error) {
      console.error('Error loading testimonials:', error);
    }
  };

  if (testimonials.length === 0) return null;

  return (
    <section className="section-padding bg-muted/30 border-b border-border">
      <div className="container-corporate">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-[1px] w-12 bg-primary" />
          <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
            Client Testimonials
          </span>
        </div>
        <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-12">
          What Our Clients Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white border border-border p-8 hover:shadow-lg transition-shadow duration-300 h-full flex flex-col"
            >
              <Quote className="w-8 h-8 text-primary mb-4 opacity-50 flex-shrink-0" />
              <p className="text-muted-foreground leading-relaxed mb-6 italic flex-grow">
                "{testimonial.content}"
              </p>
              <div className="flex items-center gap-4 mt-auto">
                {testimonial.image && (
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h3 className="font-heading text-sm text-foreground break-words">{testimonial.name}</h3>
                  <p className="text-xs text-muted-foreground break-words">
                    {testimonial.role}
                    {testimonial.company && `, ${testimonial.company}`}
                  </p>
                  <div className="flex items-center gap-1 mt-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < testimonial.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
