// src/components/GameHeader.tsx
import React from "react";
import { Dices } from "lucide-react";

const GameHeader: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <div className="inline-flex items-center space-x-3 bg-primary text-primary-foreground p-4 rounded-lg shadow-md">
        <Dices size={48} className="text-accent" />
        <h1 className="text-5xl font-headline">AMA Dice</h1>
      </div>
    </header>
  );
};

export default GameHeader;
