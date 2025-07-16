"use client";

import { Button } from "../ui/button";

export default function Error({
  refetch,
  message,
}: {
  refetch?: () => void;
  message?: string;
}) {
  return (
    <div className="flex items-center">
      <div className="mr-2">{message ? message : "Error fetching data"}</div>
      {refetch && (
        <Button variant="secondary" onClick={() => refetch()}>
          Try Again
        </Button>
      )}
    </div>
  );
}
