"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-[80vh] items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="text-center">
          <AlertCircle className="mx-auto mb-2 h-12 w-12 text-red-500" />
          <CardTitle className="text-2xl font-semibold">
            Something went wrong
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            An error occurred while processing the request.
          </p>
          {process.env.NODE_ENV === "development" && (
            <div className="mt-4 overflow-auto rounded-md bg-muted p-3 text-sm">
              <p className="font-mono">{error.message}</p>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={reset} variant="default">
            Try Again
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
