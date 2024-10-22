"use client";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Globe from "../components/Homepage/Globe";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <MaxWidthWrapper>
      <div className="mt-5">
        <h1 className="relative z-10 text-3xl md:text-7xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-700 to-neutral-300  dark:from-neutral-300 dark:to-neutral-700  text-center font-sans font-bold">
          Leading University Competitive Programming Archive
        </h1>
        <div className="full flex justify-center">
          <Globe />
        </div>
        <div className="z-10 flex my-5 md:mt-0 md:mb-5 items-center justify-center">
          <Button
            variant="outline"
            size="lg"
            className="text-xl py-8 font-mono font-bold"
          >
            Get Started
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
