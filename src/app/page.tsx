// src/app/page.tsx
"use client";

import React, { useState, useEffect, useCallback } from "react";
import GameHeader from "@/components/GameHeader";
import PlayerDisplay from "@/components/PlayerDisplay";
import CelebrationModal from "@/components/CelebrationModal";
import { Button } from "@/components/ui/button";
import { Play, RotateCw, Users } from "lucide-react";

type Player = "player1" | "player2";
type RoundPhase = "player1Roll" | "player2Roll" | "results";

export default function Home() {
  const [player1Dice, setPlayer1Dice] = useState<[number, number]>([0, 0]);
  const [player2Dice, setPlayer2Dice] = useState<[number, number]>([0, 0]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [player1Wins, setPlayer1Wins] = useState(0);
  const [player2Wins, setPlayer2Wins] = useState(0);

  const [activePlayer, setActivePlayer] = useState<Player | null>("player1");
  const [roundPhase, setRoundPhase] = useState<RoundPhase>("player1Roll");
  const [statusMessage, setStatusMessage] = useState("Player 1's Turn to Roll!");
  
  const [rollingPlayer, setRollingPlayer] = useState<Player | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [winnerName, setWinnerName] = useState<string | null>(null);
  const [isTie, setIsTie] = useState(false);

  const rollSingleDie = () => Math.floor(Math.random() * 6) + 1;

  const handleRoll = useCallback(() => {
    if (!activePlayer || rollingPlayer) return;

    setRollingPlayer(activePlayer);
    const d1 = rollSingleDie();
    const d2 = rollSingleDie();
    const currentRollScore = d1 + d2;

    if (activePlayer === "player1") {
      setPlayer1Dice([d1, d2]);
      setPlayer1Score(currentRollScore);
    } else {
      setPlayer2Dice([d1, d2]);
      setPlayer2Score(currentRollScore);
    }
  }, [activePlayer, rollingPlayer]);
  
  useEffect(() => {
    if (rollingPlayer) {
      const timer = setTimeout(() => {
        setRollingPlayer(null); 

        if (rollingPlayer === "player1") {
          setRoundPhase("player2Roll");
          setActivePlayer("player2");
          setStatusMessage("Player 2's Turn to Roll!");
        } else if (rollingPlayer === "player2") {
          setRoundPhase("results");
          setActivePlayer(null);
        }
      }, 1000); 
      return () => clearTimeout(timer);
    }
  }, [rollingPlayer]);


  useEffect(() => {
    if (roundPhase === "results" && !rollingPlayer) {
      if (player1Score > player2Score) {
        setStatusMessage("Player 1 Wins the Round!");
        setPlayer1Wins((prev) => prev + 1);
        setWinnerName("Player 1");
        setIsTie(false);
        setShowCelebration(true);
      } else if (player2Score > player1Score) {
        setStatusMessage("Player 2 Wins the Round!");
        setPlayer2Wins((prev) => prev + 1);
        setWinnerName("Player 2");
        setIsTie(false);
        setShowCelebration(true);
      } else {
        setStatusMessage("It's a Tie!");
        setWinnerName(null);
        setIsTie(true);
        setShowCelebration(true);
      }
    }
  }, [player1Score, player2Score, roundPhase, rollingPlayer]);


  const handleNextRound = useCallback(() => {
    setPlayer1Dice([0, 0]);
    setPlayer2Dice([0, 0]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setActivePlayer("player1");
    setRoundPhase("player1Roll");
    setStatusMessage("Player 1's Turn to Roll!");
    setShowCelebration(false);
    setWinnerName(null);
    setIsTie(false);
  }, []);

  const handleNewGame = useCallback(() => {
    handleNextRound();
    setPlayer1Wins(0);
    setPlayer2Wins(0);
  }, [handleNextRound]);

  const getRollButtonText = () => {
    if (roundPhase === "player1Roll") return "Player 1: Roll Dice";
    if (roundPhase === "player2Roll") return "Player 2: Roll Dice";
    return "Roll Dice";
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start p-4 bg-background text-foreground font-body">
      <GameHeader />

      <main className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between mt-8 w-full max-w-6xl mx-auto px-4 gap-4 md:gap-8">
        {/* Player 1 Display (Left Side) */}
        <div className="w-full md:w-[280px] order-1 md:order-1">
          <PlayerDisplay
            playerName="Player 1"
            dice={player1Dice}
            currentScore={player1Score}
            totalWins={player1Wins}
            isCurrentPlayer={activePlayer === "player1"}
            isRolling={rollingPlayer === "player1"}
          />
        </div>

        {/* Central Area for Status and Controls */}
        <div className="flex flex-col items-center justify-start flex-grow py-4 md:py-8 space-y-6 md:space-y-8 min-w-[200px] md:min-w-[300px] order-2 md:order-2">
          <div className="text-center">
            <p className="text-2xl font-semibold text-primary" aria-live="polite">
              {statusMessage}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleRoll}
              disabled={rollingPlayer !== null || roundPhase === "results"}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-4 md:px-8 md:py-6 text-base md:text-lg shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
              aria-label={getRollButtonText()}
            >
              <Play className="mr-2 h-5 w-5" /> {getRollButtonText()}
            </Button>

            {roundPhase === "results" && (
              <Button
                onClick={handleNextRound}
                className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-4 md:px-8 md:py-6 text-base md:text-lg shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
              >
                <RotateCw className="mr-2 h-5 w-5" /> Next Round
              </Button>
            )}
          </div>
        </div>

        {/* Player 2 Display (Right Side) */}
        <div className="w-full md:w-[280px] order-3 md:order-3">
          <PlayerDisplay
            playerName="Player 2"
            dice={player2Dice}
            currentScore={player2Score}
            totalWins={player2Wins}
            isCurrentPlayer={activePlayer === "player2"}
            isRolling={rollingPlayer === "player2"}
          />
        </div>
      </main>

      <div className="mt-8 flex justify-center">
        <Button
            onClick={handleNewGame}
            variant="outline"
            className="border-primary text-primary hover:bg-primary/10 px-6 py-4 md:px-8 md:py-6 text-base md:text-lg shadow-md transition-transform hover:scale-105 w-full sm:w-auto"
          >
          <Users className="mr-2 h-5 w-5" /> New Game
        </Button>
      </div>

      <CelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
        winnerName={winnerName}
        isTie={isTie}
      />
      
      <footer className="mt-12 text-center text-muted-foreground text-sm">
        <p>&copy; {new Date().getFullYear()} Dice Dueler. Roll with fun!</p>
      </footer>
    </div>
  );
}
