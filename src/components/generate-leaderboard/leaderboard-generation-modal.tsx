"use client";

import {
  Cpu,
  Database,
  Code,
  Zap,
  FileOutput,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";
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

export default function LeaderboardGenerationModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const generationSteps = [
    {
      text: "Initializing generation process...",
      icon: <Cpu className="h-5 w-5 text-blue-500" />,
    },
    {
      text: "Analyzing input parameters...",
      icon: <Database className="h-5 w-5 text-indigo-500" />,
    },
    {
      text: "Processing data structures...",
      icon: <Code className="h-5 w-5 text-purple-500" />,
    },
    {
      text: "Applying transformations...",
      icon: <Zap className="h-5 w-5 text-amber-500" />,
    },
    {
      text: "Finalizing output...",
      icon: <FileOutput className="h-5 w-5 text-green-500" />,
    },
    {
      text: "Generation complete!",
      icon: <CheckCircle2 className="h-5 w-5 text-emerald-500" />,
    },
  ];

  const startGeneration = () => {
    setIsGenerating(true);
    setGenerationStep(generationSteps[0].text);
    setCurrentStepIndex(0);

    // Mock generation process with timeouts
    setTimeout(() => {
      setGenerationStep(generationSteps[1].text);
      setCurrentStepIndex(1);

      setTimeout(() => {
        setGenerationStep(generationSteps[2].text);
        setCurrentStepIndex(2);

        setTimeout(() => {
          setGenerationStep(generationSteps[3].text);
          setCurrentStepIndex(3);

          setTimeout(() => {
            setGenerationStep(generationSteps[4].text);
            setCurrentStepIndex(4);

            setTimeout(() => {
              setGenerationStep(generationSteps[5].text);
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
                take a few moments.
              </div>
            ) : (
              <div className="space-y-6">
                <div className="space-y-4">
                  {generationSteps.map((step, index) => (
                    <div
                      key={index}
                      className={`flex items-center gap-3 rounded-md p-3 transition-all ${
                        index === currentStepIndex
                          ? "border bg-muted/80 shadow-sm"
                          : index < currentStepIndex
                            ? "text-muted-foreground"
                            : "opacity-40"
                      }`}
                    >
                      {index === currentStepIndex && isGenerating ? (
                        <div className="shrink-0">
                          <Loader2 className="h-5 w-5 animate-spin text-primary" />
                        </div>
                      ) : index < currentStepIndex ||
                        (index === currentStepIndex && isComplete) ? (
                        <div className="shrink-0">{step.icon}</div>
                      ) : (
                        <div className="h-5 w-5 shrink-0 rounded-full border-2 border-muted-foreground/30" />
                      )}
                      <span
                        className={`text-sm ${index === currentStepIndex ? "font-medium" : ""}`}
                      >
                        {step.text}
                      </span>
                    </div>
                  ))}
                </div>

                {isGenerating && (
                  <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
                      style={{
                        width: `${(currentStepIndex / (generationSteps.length - 1)) * 100}%`,
                      }}
                    ></div>
                  </div>
                )}
              </div>
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
