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
      // When not rolling, displayValue should reflect the actual prop 'value'.
      // If value is 0, it's for the initial '?' state. The render logic handles showing '?'.
      // We set displayValue to 1 as a default for pip rendering if value is 0 (matches original behavior).
      if (value === 0) {
        setDisplayValue(1); 
      } else {
        // For any other value, clamp it to ensure it's between 1 and 6 for display.
        setDisplayValue(Math.max(1, Math.min(6, value)));
      }
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

  return (
    <div
      className={cn(
        "w-16 h-16 md:w-20 md:h-20 bg-card border-2 border-border rounded-lg shadow-md p-2 grid grid-cols-3 grid-rows-3 gap-0.5",
        isRolling ? "animate-pulse" : "",
        className
      )}
      aria-label={`Die face showing ${displayValue}`}
    >
      {/* Cell 1 (top-left) */}
      <div className={cn("flex", (displayValue >= 2 && displayValue <= 6) ? "justify-start items-start" : "justify-center items-center")}>
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
      <div className={cn("flex", (displayValue >= 2 && displayValue <= 6) ? "justify-end items-end" : "justify-center items-center")}>
        {(displayValue === 2 || displayValue === 3 || displayValue === 4 || displayValue === 5 || displayValue === 6) && <Pip />}
      </div>
    </div>
  );
};

export default Die;
