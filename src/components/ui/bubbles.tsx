
import { cn } from "@/lib/utils";
import React from "react";

interface BubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "accent" | "cherry" | "cherry-light";
  opacity?: number;
  className?: string;
}

const sizeClasses = {
  sm: "w-4 h-4",
  md: "w-8 h-8",
  lg: "w-16 h-16",
  xl: "w-32 h-32",
};

const colorClasses = {
  primary: "bg-primary",
  secondary: "bg-secondary",
  accent: "bg-accent",
  cherry: "bg-cherry",
  "cherry-light": "bg-cherry-light",
};

export function Bubble({
  size = "md",
  color = "cherry-light",
  opacity = 0.6,
  className,
  style,
  ...props
}: BubbleProps) {
  return (
    <div
      className={cn(
        "rounded-full absolute animate-bounce-subtle",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      style={{
        opacity,
        animationDelay: `${Math.random() * 2}s`,
        ...style,
      }}
      {...props}
    />
  );
}

interface BubbleGroupProps {
  count?: number;
  area?: "small" | "medium" | "large";
  className?: string;
}

export function BubbleGroup({
  count = 5,
  area = "medium",
  className,
}: BubbleGroupProps) {
  const areaSize = {
    small: { width: 100, height: 100 },
    medium: { width: 200, height: 200 },
    large: { width: 400, height: 400 },
  }[area];

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: count }).map((_, i) => {
        const size = ["sm", "md", "lg"][Math.floor(Math.random() * 3)] as "sm" | "md" | "lg";
        const color = ["cherry", "cherry-light", "accent"][
          Math.floor(Math.random() * 3)
        ] as "cherry" | "cherry-light" | "accent";
        
        return (
          <Bubble
            key={i}
            size={size}
            color={color}
            opacity={0.3 + Math.random() * 0.4}
            style={{
              left: `${Math.random() * areaSize.width}px`,
              top: `${Math.random() * areaSize.height}px`,
            }}
          />
        );
      })}
    </div>
  );
}
