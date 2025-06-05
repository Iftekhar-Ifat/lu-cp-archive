"use client";

import { type ReactNode } from "react";
import {
  Cpu,
  Database,
  Code,
  Zap,
  FileOutput,
  CheckCircle2,
  Loader2,
} from "lucide-react";

type LeaderboardGenerationStep = {
  text: string;
  icon: ReactNode;
};

export const leaderboardGenerationSteps: LeaderboardGenerationStep[] = [
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

type GenerationStepsProps = {
  currentStepIndex: number;
  isGenerating: boolean;
  isComplete: boolean;
};

export default function LeaderboardGenerationStepsUI({
  currentStepIndex,
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
              width: `${(currentStepIndex / (leaderboardGenerationSteps.length - 1)) * 100}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
}
