import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "limestone" | "canvas" | "dark" | "outlined";
  hoverable?: boolean;
}

export function Card({
  children,
  variant = "limestone",
  hoverable = false,
  className = "",
  ...props
}: CardProps) {
  const variantStyles = {
    limestone: "bg-surface-card border border-hairline text-ink",
    canvas: "bg-canvas border border-hairline text-ink",
    dark: "bg-surface-dark border border-surface-dark-elevated text-on-dark",
    outlined: "bg-transparent border border-hairline text-ink",
  }[variant];

  const hoverStyles = hoverable
    ? "transition-all duration-300 hover:shadow-md hover:-translate-y-1 hover:border-muted-light"
    : "";

  return (
    <div
      className={`rounded-xl p-6 relative overflow-hidden ${variantStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
