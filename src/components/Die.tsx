// src/components/Die.tsx
"use client";

import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

interface DieProps {
  value: number;
  isRolling?: boolean;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const Pip: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn("bg-foreground rounded-full", className)} />
);

const Die: React.FC<DieProps> = ({ value, isRolling = false, className, size = 'md' }) => {
  const [displayValue, setDisplayValue] = useState(value);

  useEffect(() => {
    if (isRolling) {
      const interval = setInterval(() => {
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      }, 75);
      return () => clearInterval(interval);
    } else {
      // Ensure value is between 1 and 6 for display, or 0 if specifically passed as 0 and not rolling.
      if (value === 0) {
        setDisplayValue(0);
      } else {
        setDisplayValue(Math.max(1, Math.min(6, value)));
      }
    }
  }, [isRolling, value]);

  const sizeClasses = {
    sm: {
      container: "w-12 h-12 md:w-14 md:h-14",
      pip: "w-2 h-2 md:w-2.5 md:h-2.5",
      placeholderText: "text-2xl",
    },
    md: {
      container: "w-16 h-16 md:w-20 md:h-20",
      pip: "w-2.5 h-2.5 md:w-3 md:h-3",
      placeholderText: "text-4xl",
    },
    lg: {
      container: "w-24 h-24 md:w-32 md:h-32",
      pip: "w-4 h-4 md:w-5 md:h-5",
      placeholderText: "text-6xl",
    },
  };

  const currentSize = sizeClasses[size];

  // Handles the case where the die should be shown as empty (e.g., before the first roll)
  if (displayValue === 0 && !isRolling) {
    return (
      <div
        className={cn(
          "bg-card border-2 border-border rounded-lg shadow-md flex items-center justify-center text-muted-foreground",
          currentSize.container,
          currentSize.placeholderText,
          className
        )}
        aria-label="Empty die"
      >
        ?
      </div>
    );
  }

  // Ensure pipDisplayValue is always 1-6 for rendering pips.
  const pipDisplayValue = Math.max(1, Math.min(6, displayValue));
  
  const show = (v: number[]) => v.includes(pipDisplayValue);

  return (
    <div
      className={cn(
        "bg-card border-2 border-border rounded-lg shadow-md p-1 md:p-2 grid grid-cols-3 grid-rows-3 gap-0.5",
        currentSize.container,
        isRolling ? "animate-die-roll-shake" : "",
        className
      )}
      aria-label={`Die face showing ${pipDisplayValue}`}
    >
      {/* Top row */}
      <div className="flex justify-start items-start">
        {show([2, 3, 4, 5, 6]) && <Pip className={currentSize.pip} />}
      </div>
      <div className="flex justify-center items-start"></div>
      <div className="flex justify-end items-start">
        {show([4, 5, 6]) && <Pip className={currentSize.pip} />}
      </div>

      {/* Middle row */}
      <div className="flex justify-start items-center">
        {show([6]) && <Pip className={currentSize.pip} />}
      </div>
      <div className="flex justify-center items-center">
        {show([1, 3, 5]) && <Pip className={currentSize.pip} />}
      </div>
      <div className="flex justify-end items-center">
        {show([6]) && <Pip className={currentSize.pip} />}
      </div>

      {/* Bottom row */}
      <div className="flex justify-start items-end">
        {show([4, 5, 6]) && <Pip className={currentSize.pip} />}
      </div>
      <div className="flex justify-center items-end"></div>
      <div className="flex justify-end items-end">
        {show([2, 3, 4, 5, 6]) && <Pip className={currentSize.pip} />}
      </div>
    </div>
  );
};

export default Die;
