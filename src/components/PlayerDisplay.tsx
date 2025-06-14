// src/components/PlayerDisplay.tsx
"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Die from "@/components/Die";
import { cn } from "@/lib/utils";
import { Trophy } from "lucide-react";

interface PlayerDisplayProps {
  playerName: string;
  dice: [number, number];
  currentScore: number;
  totalWins: number;
  isCurrentPlayer: boolean;
  isRolling?: boolean;
}

const PlayerDisplay: React.FC<PlayerDisplayProps> = ({
  playerName,
  dice,
  currentScore,
  totalWins,
  isCurrentPlayer,
  isRolling = false,
}) => {
  return (
    <Card 
      className={cn(
        "w-full shadow-lg transition-all duration-300 transform", 
        isCurrentPlayer ? "border-accent ring-2 ring-accent scale-105" : "border-primary",
        "bg-card"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-xl md:text-2xl font-headline text-primary-foreground bg-primary p-3 rounded-t-md -m-6 mb-0 text-center">
          {playerName}
        </CardTitle>
        {isCurrentPlayer && (
          <CardDescription className="text-center text-accent pt-2 font-semibold">
            Your Turn!
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-4 flex flex-col items-center space-y-3 md:space-y-4">
        <div className="flex space-x-2 md:space-x-3">
          <Die value={dice[0]} isRolling={isRolling} size="sm" />
          <Die value={dice[1]} isRolling={isRolling} size="sm" />
        </div>
        <div className="text-center">
          <p className="text-base md:text-lg text-muted-foreground">Current Roll:</p>
          <p className="text-3xl md:text-4xl font-bold text-primary">
            {isRolling ? "..." : currentScore}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-accent">
          <Trophy className="w-5 h-5 md:w-6 md:h-6" />
          <p className="text-lg md:text-xl font-semibold">Wins: {totalWins}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDisplay;
