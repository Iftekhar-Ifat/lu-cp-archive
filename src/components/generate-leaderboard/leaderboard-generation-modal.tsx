"use client";

import { CheckCircle2, Sparkles, Loader2, XCircle } from "lucide-react";
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useState,
} from "react";
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
import {
  LeaderboardGenerationStepsUI,
  LeaderboardGenerationErrorUI,
  leaderboardGenerationSteps,
} from "./leaderboard-generation-steps";
import {
  checkCodeforcesStatus,
  getUsersCFhandle,
} from "@/app/dashboard/leaderboard/generate-leaderboard/generate-leaderboard-actions";
import { fetchUserCFData } from "@/utils/generate-leaderboard-helper";

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
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  // Mock function to simulate random errors
  const mockStepExecution = async (stepIndex: number) => {
    // 20% chance of error on any step after the first one
    if (stepIndex > 0 && Math.random() < 0.2) {
      throw new Error(
        `Failed at step ${stepIndex + 1}: ${leaderboardGenerationSteps[stepIndex].text}`
      );
    }
  };

  const startGeneration = async () => {
    try {
      setIsGenerating(true);
      setHasError(false);

      setCurrentStepIndex(0);
      setGenerationStep(leaderboardGenerationSteps[0].text);
      const codeforcesStatus = await checkCodeforcesStatus();
      if (codeforcesStatus.error) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${codeforcesStatus.error}`
        );
      }

      setCurrentStepIndex(1);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const usersCFhandle = await getUsersCFhandle();
      if (usersCFhandle.error || !usersCFhandle.success) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${usersCFhandle.error}`
        );
      }

      setCurrentStepIndex(2);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const codeforcesUserData = await fetchUserCFData(usersCFhandle.data);
      if (codeforcesUserData.error || !codeforcesUserData.success) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${codeforcesUserData.error}`
        );
      }

      console.log(codeforcesUserData);

      setCurrentStepIndex(3);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      await delay(2000);
      await mockStepExecution(3);

      setCurrentStepIndex(4);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      await delay(1500);
      await mockStepExecution(4);

      setCurrentStepIndex(5);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      await mockStepExecution(5);

      setIsGenerating(false);
      setIsComplete(true);
    } catch (error) {
      setIsGenerating(false);
      setHasError(true);
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  const handleClose = () => {
    setOpen(false);

    // Reset states after dialog closes
    setIsGenerating(false);
    setGenerationStep("");
    setIsComplete(false);
    setHasError(false);
    setErrorMessage("");
    setCurrentStepIndex(0);

    // Only set successful generation if there was no error
    if (!hasError) {
      setIsSuccessfulGeneration(true);
    }
  };

  const handleRetry = () => {
    setHasError(false);
    setErrorMessage("");
    setCurrentStepIndex(0);
    startGeneration();
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
      <AlertDialogContent className="max-w-[95%] font-sans sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            {!isGenerating && !isComplete && !hasError ? (
              <>
                <Sparkles className="h-5 w-5 text-primary" />
                Start Generation
              </>
            ) : hasError ? (
              <>
                <XCircle className="h-5 w-5 text-red-500" />
                Generation Failed
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
          <AlertDialogDescription asChild>
            <div className="space-y-6">
              {!isGenerating && !isComplete && !hasError ? (
                <div>
                  Are you sure you want to start the generation process? This
                  may take several minutes and cannot be interrupted
                </div>
              ) : hasError ? (
                <LeaderboardGenerationErrorUI errorMessage={errorMessage} />
              ) : (
                <LeaderboardGenerationStepsUI
                  currentStep={currentStepIndex}
                  isGenerating={isGenerating}
                  isComplete={isComplete}
                />
              )}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {!isGenerating && !isComplete && !hasError ? (
            <>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <Button onClick={startGeneration}>
                <Sparkles />
                Confirm
              </Button>
            </>
          ) : hasError ? (
            <>
              <AlertDialogCancel onClick={handleClose}>
                Cancel
              </AlertDialogCancel>
              <Button onClick={handleRetry} variant="default" className="gap-2">
                <Sparkles />
                Retry
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
