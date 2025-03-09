"use client";

import MaxWidthWrapper from "@/components/max-width-wrapper";
import Globe from "../components/Homepage/Globe";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Home() {
  const { user, isLoaded } = useUser();
  const router = useRouter();

  const handleClick = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      toast.error("Please log in to continue", {
        position: "top-center",
      });
    }
  };

  return (
    <MaxWidthWrapper>
      <div className="mt-5">
        <h1 className="relative z-10 bg-gradient-to-b from-neutral-700 to-neutral-300 bg-clip-text text-center font-sans text-3xl font-bold text-transparent dark:from-neutral-300 dark:to-neutral-700 md:text-7xl">
          Leading University Competitive Programming Archive
        </h1>
        <div className="full flex justify-center">
          <Globe />
        </div>
        <div className="z-10 my-5 flex items-center justify-center md:mb-5 md:mt-0">
          <Button
            variant="outline"
            size="lg"
            className="py-8 font-mono text-xl font-bold"
            onClick={handleClick}
            disabled={!isLoaded}
          >
            {!isLoaded ? "Loading..." : "Get Started"}
          </Button>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
