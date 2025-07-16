"use client";

import { type ReactNode } from "react";
import {
  Database,
  Code,
  Zap,
  FileOutput,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Icons } from "../icons";

type LeaderboardGenerationStep = {
  text: string;
  icon: ReactNode;
};

export const leaderboardGenerationSteps: LeaderboardGenerationStep[] = [
  {
    text: "Checking codeforces status...",
    icon: <Icons.codeforces className="h-5 w-5" />,
  },
  {
    text: "Getting user's data from DB...",
    icon: <Database className="h-5 w-5 text-indigo-500" />,
  },
  {
    text: "Getting user's cf-data...",
    icon: <Code className="h-5 w-5 text-purple-500" />,
  },
  {
    text: "Calculating points...",
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

type GenerationStepsProps = {
  currentStep: number;
  isGenerating: boolean;
  isComplete: boolean;
};

export function LeaderboardGenerationStepsUI({
  currentStep,
  isGenerating,
  isComplete,
}: GenerationStepsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {leaderboardGenerationSteps.map((step, index) => (
          <div
            key={index}
            className={`flex items-center gap-3 rounded-md p-3 transition-all ${
              index === currentStep
                ? "border bg-muted/80 shadow-sm"
                : index < currentStep
                  ? "text-muted-foreground"
                  : "opacity-40"
            }`}
          >
            {index === currentStep && isGenerating ? (
              <div className="shrink-0">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
              </div>
            ) : index < currentStep || (index === currentStep && isComplete) ? (
              <div className="shrink-0">{step.icon}</div>
            ) : (
              <div className="h-5 w-5 shrink-0 rounded-full border-2 border-muted-foreground/30" />
            )}
            <span
              className={`text-sm ${index === currentStep ? "font-medium" : ""}`}
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
              width: `${(currentStep / (leaderboardGenerationSteps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

export function LeaderboardGenerationErrorUI({
  errorMessage,
}: {
  errorMessage: string;
}) {
  return (
    <div className="space-y-3">
      <div className="font-medium text-red-600">An error occurred</div>
      <div className="text-sm text-muted-foreground">{errorMessage}</div>
    </div>
  );
}
