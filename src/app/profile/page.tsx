import MaxWidthWrapper from "@/components/max-width-wrapper";
import React from "react";

export default function Profile() {
  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
          <div className="flex items-center">
            <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
              Profile
            </span>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
