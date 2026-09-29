import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "terracotta" | "deep-rust" | "olive" | "limestone" | "outline";
  size?: "sm" | "md";
  className?: string;
  icon?: React.ReactNode;
}

export function Badge({
  children,
  variant = "limestone",
  size = "sm",
  className = "",
  icon,
}: BadgeProps) {
  const sizeStyles = {
    sm: "px-2.5 py-0.5 text-xs tracking-wider",
    md: "px-3.5 py-1 text-xs tracking-wider",
  }[size];

  const variantStyles = {
    terracotta: "bg-terracotta text-white font-medium",
    "deep-rust": "bg-deep-rust text-white font-medium",
    olive: "bg-olive text-white font-medium",
    limestone: "bg-soft-limestone text-deep-rust border border-hairline font-medium",
    outline: "border border-hairline text-muted font-medium bg-canvas",
  }[variant];

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full uppercase tracking-wider ${sizeStyles} ${variantStyles} ${className}`}
    >
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      {children}
    </span>
  );
}
