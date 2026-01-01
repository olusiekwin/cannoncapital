import { ReactNode } from "react";

interface AnimatedHeroProps {
  title: string;
  subtitle?: string;
  label?: string;
  backgroundImage?: string;
  backgroundVideo?: string;
  children?: ReactNode;
}

export function AnimatedHero({
  title,
  subtitle,
  label,
  backgroundImage,
  backgroundVideo,
  children,
}: AnimatedHeroProps) {
  return (
    <section className="relative py-16 lg:py-20 border-b border-border min-h-[40vh] flex items-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        {backgroundVideo ? (
          <>
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover scale-110 animate-zoom-slow"
            >
              <source src={backgroundVideo} type="video/mp4" />
            </video>
            {backgroundImage && (
              <img
                src={backgroundImage}
                alt=""
                className="absolute inset-0 w-full h-full object-cover scale-110 animate-zoom-slow hidden"
              />
            )}
          </>
        ) : backgroundImage ? (
          <div className="relative w-full h-full">
            <img
              src={backgroundImage}
              alt=""
              className="w-full h-full object-cover scale-110 animate-zoom-slow"
            />
          </div>
        ) : null}
        <div className="absolute inset-0 bg-black/60" />
        {/* Animated gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60 animate-gradient-shift" />
      </div>

      {/* Content */}
      <div className="container-corporate relative z-10">
        <div className="max-w-3xl">
          {label && (
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[1px] w-12 bg-primary" />
              <span className="text-xs font-body uppercase tracking-[0.3em] text-primary font-medium">
                {label}
              </span>
            </div>
          )}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white mb-4 lg:mb-6 leading-[1.1] font-semibold">
            {title}
          </h1>
          {subtitle && (
            <p className="text-base lg:text-lg text-white/90 leading-relaxed">
              {subtitle}
            </p>
          )}
          {children}
        </div>
      </div>
    </section>
  );
}
