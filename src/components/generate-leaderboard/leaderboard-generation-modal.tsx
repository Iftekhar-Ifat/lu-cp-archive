"use client";

import { CheckCircle2, Sparkles, Loader2, XCircle } from "lucide-react";
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
import {
  LeaderboardGenerationStepsUI,
  LeaderboardGenerationErrorUI,
  leaderboardGenerationSteps,
} from "./leaderboard-generation-steps";
import {
  checkCodeforcesStatus,
  getUsersCFhandle,
} from "@/app/dashboard/leaderboard/generate-leaderboard/generate-leaderboard-actions";
import {
  computeInitialScore,
  fetchUserCFData,
  finalizedLeaderboardData,
  mergeUserDataWithScores,
} from "@/utils/generate-leaderboard-helper";
import { type GeneratedLeaderboard } from "@/utils/schema/generated-leaderboard";

export default function LeaderboardGenerationModal({
  open,
  setOpen,
  setIsSuccessfulGeneration,
  setGeneratedData,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIsSuccessfulGeneration: Dispatch<SetStateAction<boolean>>;
  setGeneratedData: Dispatch<SetStateAction<GeneratedLeaderboard[]>>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [, setGenerationStep] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const startGeneration = async () => {
    try {
      setIsGenerating(true);
      setHasError(false);

      // STEP - 1
      setCurrentStepIndex(0);
      setGenerationStep(leaderboardGenerationSteps[0].text);
      const codeforcesStatus = await checkCodeforcesStatus();
      if (codeforcesStatus.error) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${codeforcesStatus.error}`
        );
      }

      // STEP - 2
      setCurrentStepIndex(1);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const usersData = await getUsersCFhandle();
      if (usersData.error || !usersData.success) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${usersData.error}`
        );
      }

      // STEP - 3
      setCurrentStepIndex(2);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const cfHandlesArray = usersData.data.map((user) => user.cf_handle);
      const codeforcesUserData = await fetchUserCFData(cfHandlesArray);
      if (codeforcesUserData.error || !codeforcesUserData.success) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${codeforcesUserData.error}`
        );
      }

      // STEP - 4
      setCurrentStepIndex(3);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const initialScore = computeInitialScore(codeforcesUserData.data);
      if (initialScore.error || !initialScore.success) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${initialScore.error}`
        );
      }

      // STEP - 5
      setCurrentStepIndex(4);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const generatedResult = mergeUserDataWithScores(
        initialScore.data,
        usersData.data
      );
      if (
        generatedResult.error ||
        !generatedResult.success ||
        !generatedResult.data
      ) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${generatedResult.error}`
        );
      }

      // STEP - 6
      setCurrentStepIndex(5);
      setGenerationStep(leaderboardGenerationSteps[currentStepIndex + 1].text);
      const leaderboardData = finalizedLeaderboardData(generatedResult.data);
      if (
        leaderboardData.error ||
        !leaderboardData.success ||
        !leaderboardData.data
      ) {
        throw new Error(
          `Failed at step ${currentStepIndex + 1}: ${leaderboardData.error}`
        );
      }

      setGeneratedData(leaderboardData.data);

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
