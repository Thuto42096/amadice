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
        "w-full shadow-lg transition-all duration-300 transform", // Adjusted width to w-full, parent will control size
        isCurrentPlayer ? "border-accent ring-2 ring-accent scale-105" : "border-primary",
        "bg-card"
      )}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-headline text-primary-foreground bg-primary p-3 rounded-t-md -m-6 mb-0 text-center">
          {playerName}
        </CardTitle>
        {isCurrentPlayer && (
          <CardDescription className="text-center text-accent pt-2 font-semibold">
            Your Turn!
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-4 flex flex-col items-center space-y-4">
        <div className="flex space-x-4">
          <Die value={dice[0]} isRolling={isRolling} />
          <Die value={dice[1]} isRolling={isRolling} />
        </div>
        <div className="text-center">
          <p className="text-lg text-muted-foreground">Current Roll:</p>
          <p className="text-4xl font-bold text-primary">
            {isRolling ? "..." : currentScore}
          </p>
        </div>
        <div className="flex items-center space-x-2 text-accent">
          <Trophy className="w-6 h-6" />
          <p className="text-xl font-semibold">Wins: {totalWins}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerDisplay;
