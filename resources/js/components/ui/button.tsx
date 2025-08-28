import * as React from "react"
import { cn } from "@/lib/utils"

const getButtonClasses = (variant?: string, size?: string) => {
  const baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";
  
  const variantClasses = {
    default: "bg-slate-900 text-white hover:bg-slate-800",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-200 bg-white hover:bg-gray-50 text-gray-900",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    ghost: "hover:bg-gray-100 text-gray-900",
    link: "text-blue-600 underline-offset-4 hover:underline",
  };
  
  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3",
    lg: "h-11 px-8",
    icon: "h-10 w-10",
  };
  
  const variantClass = variantClasses[variant as keyof typeof variantClasses] || variantClasses.default;
  const sizeClass = sizeClasses[size as keyof typeof sizeClasses] || sizeClasses.default;
  
  return `${baseClasses} ${variantClass} ${sizeClass}`;
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const buttonClass = cn(getButtonClasses(variant, size), className);
    
    if (asChild) {
      // If asChild is true, just return a span with the styles
      return (
        <span className={buttonClass} {...(props as React.HTMLAttributes<HTMLSpanElement>)} />
      );
    }
    
    return (
      <button
        className={buttonClass}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }