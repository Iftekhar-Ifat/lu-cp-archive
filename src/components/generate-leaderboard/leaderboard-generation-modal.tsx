"use client";

import { CheckCircle2, Sparkles, Loader2 } from "lucide-react";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import LeaderboardGenerationStepsUI, {
  leaderboardGenerationSteps,
} from "./leaderboard-generation-steps";

export default function LeaderboardGenerationModal({
  open,
  setOpen,
  setIsSuccessfulGeneration,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsSuccessfulGeneration: Dispatch<SetStateAction<boolean>>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [, setGenerationStep] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(leaderboardGenerationSteps[0].text);
    setCurrentStepIndex(0);

    // Mock generation process with timeouts
    setTimeout(() => {
      setGenerationStep(leaderboardGenerationSteps[1].text);
      setCurrentStepIndex(1);

      setTimeout(() => {
        setGenerationStep(leaderboardGenerationSteps[2].text);
        setCurrentStepIndex(2);

        setTimeout(() => {
          setGenerationStep(leaderboardGenerationSteps[3].text);
          setCurrentStepIndex(3);

          setTimeout(() => {
            setGenerationStep(leaderboardGenerationSteps[4].text);
            setCurrentStepIndex(4);

            setTimeout(() => {
              setGenerationStep(leaderboardGenerationSteps[5].text);
              setCurrentStepIndex(5);
              setIsGenerating(false);
              setIsComplete(true);
            }, 1500);
          }, 2000);
        }, 1800);
      }, 1500);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
    // Reset states after dialog closes
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationStep("");
      setIsComplete(false);
      setCurrentStepIndex(0);
    }, 300);
    setIsSuccessfulGeneration(true);
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={(isOpen) => {
        // Prevent closing the dialog during generation
        if (isGenerating) return;
        setOpen(isOpen);
      }}
    >
      <AlertDialogContent className="sm:max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {!isGenerating && !isComplete ? (
              <>
                <Sparkles className="h-5 w-5 text-primary" />
                Start Generation
              </>
            ) : isComplete ? (
              <>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Generation Complete
              </>
            ) : (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                Generating...
              </>
            )}
          </AlertDialogTitle>
          <AlertDialogDescription className="space-y-6 pt-2">
            {!isGenerating && !isComplete ? (
              <div className="text-sm text-muted-foreground">
                Are you sure you want to start the generation process? This may
                take several minutes and cannot be interrupted
              </div>
            ) : (
              <LeaderboardGenerationStepsUI
                currentStepIndex={currentStepIndex}
                isGenerating={isGenerating}
                isComplete={isComplete}
              />
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!isGenerating && !isComplete ? (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={startGeneration}>
                <Sparkles />
                Confirm
              </Button>
            </>
          ) : isComplete ? (
            <Button onClick={handleClose} variant="default" className="gap-2">
              <CheckCircle2 />
              Close
            </Button>
          ) : (
            <Button disabled variant="outline" className="opacity-50">
              <Loader2 className="animate-spin" />
              Generating...
            </Button>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
