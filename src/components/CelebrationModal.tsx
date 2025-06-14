// src/components/CelebrationModal.tsx
"use client";

import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button"; // Using Button for consistency if AlertDialogAction is not styled as desired

interface CelebrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  winnerName?: string | null;
  isTie: boolean;
}

const CelebrationModal: React.FC<CelebrationModalProps> = ({
  isOpen,
  onClose,
  winnerName,
  isTie,
}) => {
  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="bg-background border-accent shadow-2xl rounded-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-3xl font-headline text-center text-accent">
            {isTie ? "It's a Tie!" : "Round Over!"}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-lg text-foreground pt-2">
            {isTie
              ? "No winner this round. Play again!"
              : `${winnerName} wins this round! Congratulations!`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="flex justify-center py-6">
          <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent lucide lucide-party-popper animate-bounce">
             <path d="M5.5 20a.5.5 0 0 1-.5-.5v- вертикально-2a.5.5 0 0 1 1 0v2a.5.5 0 0 1-.5.5Z"/>
             <path d="M5 14H4a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h1"/>
             <path d="M18.5 20a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-1 0v2a.5.5 0 0 0 .5.5Z"/>
             <path d="M19 14h1a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-1"/>
             <path d="M10 14V8a2 2 0 0 1 2-2h0a2 2 0 0 1 2 2v6"/>
             <path d="M10 14h4"/>
             <path d="m14.5 8-.5-1-.5 1"/>
             <path d="m9.5 8 .5-1 .5 1"/>
             <path d="M12 6V3"/>
             <path d="M7 10.5a2.5 2.5 0 0 1 0-5C8.4 5.5 9.4 6 10 7c.4-.7.9-1 1.5-1.3"/>
             <path d="M17 10.5a2.5 2.5 0 0 0 0-5c-1.4-0.5-2.4 0-3 .9-.4.7-.9 1-1.5 1.3"/>
           </svg>
        </div>
        <AlertDialogFooter>
          <Button onClick={onClose} className="bg-primary hover:bg-primary/90 text-primary-foreground w-full">
            Continue
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default CelebrationModal;
