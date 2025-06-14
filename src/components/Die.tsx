// src/components/Die.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface DieProps {
  value: number;
  isRolling?: boolean;
  className?: string;
}

const Pip: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("w-2.5 h-2.5 md:w-3 md:h-3 bg-foreground rounded-full", className)} />
);

const Die: React.FC<DieProps> = ({ value, isRolling = false, className }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 75);
      return () => clearInterval(interval);
    } else {
      // Ensure final value is set once rolling stops, even if it's 0 (blank)
      setDisplayValue(value === 0 ? 1 : value); // Default to 1 if value is 0 and not rolling
    }
  }, [isRolling, value]);
  
  // If value is 0 (e.g. initial state), render a blank die or specific style
  if (value === 0 && !isRolling) {
    return (
      <div
        className={cn(
          "w-16 h-16 md:w-20 md:h-20 bg-card border-2 border-border rounded-lg shadow-md flex items-center justify-center text-muted-foreground",
          className
        )}
        aria-label="Empty die"
      >
        ?
      </div>
    );
  }

  const pipPositions: { [key: number]: string[] } = {
    1: ["justify-center items-center"],
    2: ["justify-start items-start", "justify-end items-end"],
    3: ["justify-start items-start", "justify-center items-center", "justify-end items-end"],
    4: ["justify-start items-start", "justify-end items-start", "justify-start items-end", "justify-end items-end"],
    5: ["justify-start items-start", "justify-end items-start", "justify-center items-center", "justify-start items-end", "justify-end items-end"],
    6: ["justify-start items-start", "justify-end items-start", "justify-start items-center", "justify-end items-center", "justify-start items-end", "justify-end items-end"],
  };

  const currentPips = pipPositions[displayValue as keyof typeof pipPositions] || [];

  return (
    <div
      className={cn(
        "w-16 h-16 md:w-20 md:h-20 bg-card border-2 border-border rounded-lg shadow-md p-2 grid grid-cols-3 grid-rows-3 gap-0.5",
        isRolling ? "animate-pulse" : "",
        className
      )}
      aria-label={`Die face showing ${displayValue}`}
    >
      {/* Simplified pip rendering based on common patterns */}
      {/* This structure creates 9 cells. We will place pips based on displayValue */}
      {/* Cell 1 (top-left) */}
      <div className={cn("flex", currentPips.includes("justify-start items-start") || (displayValue === 2 || displayValue === 3 || displayValue === 4 || displayValue === 5 || displayValue === 6) ? "justify-start items-start" : "justify-center items-center")}>
        {(displayValue === 2 || displayValue === 3 || displayValue === 4 || displayValue === 5 || displayValue === 6) && <Pip />}
      </div>
      {/* Cell 2 (top-center) */}
      <div className={cn("flex justify-center items-start")}>
        {displayValue === 6 && <Pip />}
      </div>
      {/* Cell 3 (top-right) */}
      <div className={cn("flex", (displayValue === 4 || displayValue === 5 || displayValue === 6) ? "justify-end items-start" : "justify-center items-center")}>
        {(displayValue === 4 || displayValue === 5 || displayValue === 6) && <Pip />}
      </div>
      {/* Cell 4 (middle-left) */}
      <div className={cn("flex justify-start items-center")}>
        {(displayValue === 6) && <Pip />}
      </div>
      {/* Cell 5 (center) */}
      <div className={cn("flex justify-center items-center")}>
        {(displayValue === 1 || displayValue === 3 || displayValue === 5) && <Pip />}
      </div>
      {/* Cell 6 (middle-right) */}
      <div className={cn("flex justify-end items-center")}>
        {(displayValue === 6) && <Pip />}
      </div>
      {/* Cell 7 (bottom-left) */}
      <div className={cn("flex", (displayValue === 4 || displayValue === 5 || displayValue === 6) ? "justify-start items-end" : "justify-center items-center")}>
        {(displayValue === 4 || displayValue === 5 || displayValue === 6) && <Pip />}
      </div>
      {/* Cell 8 (bottom-center) */}
      <div className={cn("flex justify-center items-end")}>
         {displayValue === 6 && <Pip />}
      </div>
      {/* Cell 9 (bottom-right) */}
      <div className={cn("flex", (displayValue === 2 || displayValue === 3 || displayValue === 4 || displayValue === 5 || displayValue === 6) ? "justify-end items-end" : "justify-center items-center")}>
        {(displayValue === 2 || displayValue === 3 || displayValue === 4 || displayValue === 5 || displayValue === 6) && <Pip />}
      </div>
    </div>
  );
};

export default Die;
