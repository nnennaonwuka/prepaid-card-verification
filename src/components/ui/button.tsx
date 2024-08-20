import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  `inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors duration-300 focus-visible:outline-none  disabled:pointer-events-none  disabled:bg-transparent disabled:text-[#75748F66] disabled:border disabled:border-[#75748F66]`,
  {
    variants: {
      variant: {
        default: "bg-primary-green text-white hover:bg-[#367015] active:bg-primary-green ",
        destructive: "bg-destructive text-white hover:bg-[#F20000] active:bg-destructive",
        outline:
          "border border-primary-green bg-white text-primary-green hover:text-white hover:bg-[#367015] active:bg-primary-green active:text-white",
        "outline-red": "border border-[#FF4B4B] bg-white text-[#FF4B4B] hover:bg-[#F20000] hover:text-white active:bg-destructive active:text-white",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
});
Button.displayName = "Button";

export { Button, buttonVariants };
