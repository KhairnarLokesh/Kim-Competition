import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "olive" | "ghost";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  children,
  icon,
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none";

  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs rounded-md gap-1.5 h-8",
    md: "px-5 py-2.5 text-sm rounded-md gap-2 h-10",
    lg: "px-7 py-3.5 text-base rounded-md gap-2.5 h-12",
  }[size];

  const variantStyles = {
    primary:
      "bg-terracotta text-white hover:bg-terracotta-hover focus:ring-terracotta shadow-sm active:translate-y-0.5",
    secondary:
      "bg-soft-limestone text-ink hover:bg-soft-limestone-hover border border-hairline focus:ring-deep-rust",
    outline:
      "border border-deep-rust text-deep-rust hover:bg-deep-rust hover:text-white focus:ring-deep-rust",
    olive:
      "bg-olive text-white hover:bg-olive-hover focus:ring-olive shadow-sm",
    ghost:
      "text-ink hover:bg-soft-limestone hover:text-deep-rust focus:ring-hairline",
  }[variant];

  return (
    <button
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
