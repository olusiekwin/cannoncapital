import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-body font-medium tracking-wide uppercase transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary/80",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-foreground/30 bg-transparent text-foreground hover:border-primary hover:text-primary",
        secondary:
          "bg-muted text-foreground hover:bg-muted/80",
        ghost:
          "text-foreground hover:text-primary",
        link:
          "text-foreground underline-offset-4 hover:underline hover:text-primary",
        corporate:
          "bg-transparent border border-primary text-primary hover:bg-primary hover:text-primary-foreground",
        hero:
          "bg-primary text-primary-foreground hover:bg-primary/80 px-8 py-4 text-sm tracking-widest",
        heroOutline:
          "border border-foreground/40 bg-transparent text-foreground hover:border-foreground hover:bg-foreground/5 px-8 py-4 text-sm tracking-widest",
      },
      size: {
        default: "h-11 px-6 py-2",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-8 py-3",
        xl: "h-14 px-10 py-4",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
