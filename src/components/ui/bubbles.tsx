
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

interface BubblesProps {
  className?: string;
  bubbleCount?: number;
  colors?: string[];
  maxSize?: number;
  minSize?: number;
  speed?: number;
}

export function Bubbles({
  className,
  bubbleCount = 10,
  colors = ["#e1bee7", "#f8bbd0", "#ffcdd2"],
  maxSize = 100,
  minSize = 20,
  speed = 20,
}: BubblesProps) {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)}>
      {Array.from({ length: bubbleCount }).map((_, i) => {
        const size = minSize + Math.random() * (maxSize - minSize);
        const color = colors[Math.floor(Math.random() * colors.length)];
        const animationDuration = (speed / 10) + (Math.random() * speed / 10);
        
        return (
          <div
            key={i}
            className="rounded-full absolute animate-float"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              backgroundColor: color,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
              animationDuration: `${animationDuration}s`,
              animationDelay: `${Math.random() * animationDuration}s`,
            }}
          />
        );
      })}
    </div>
  );
}
