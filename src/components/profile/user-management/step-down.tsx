"use client";

import UserTypeBadge from "../../shared/user-type-badge";
import { Button, buttonVariants } from "../../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../ui/alert-dialog";
import { useStrictSession } from "@/hooks/use-strict-session";
import { useState } from "react";
import { toast } from "sonner";
import { isActionError } from "@/utils/error-helper";
import { userStepDown } from "@/app/profile/[user_name]/profile-actions";
import { useSession } from "next-auth/react";

export default function StepDown() {
  const session = useStrictSession();
  const { update, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);

  const handleStepDown = async () => {
    setIsLoading(true);
    try {
      const result = await userStepDown();
      if (isActionError(result)) {
        toast.error(result.error, {
          position: "top-center",
        });
      } else {
        await update({
          user_type: "STANDARD",
        });
        window.location.reload();
        toast.success("Role updated successfully.", {
          position: "top-center",
          duration: 5000,
        });
      }
    } catch (error) {
      console.error(`Failed to update:`, error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="rounded border p-4">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <div>
          <h3 className="font-medium">
            Your Current Role:{" "}
            <UserTypeBadge
              user_type={session.user.user_type}
              className="text-sm"
            />
          </h3>
          <p className="text-sm text-muted-foreground">
            You can step down from your position if you want
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              className="w-full md:w-fit"
              variant="destructive"
              disabled={status === "loading"}
            >
              Step Down
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent className="max-w-[95%] font-sans sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle>Stepping Down?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to step down from {session.user.user_type}
                ?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                className={buttonVariants({
                  variant: "destructive",
                })}
                onClick={handleStepDown}
                disabled={isLoading}
              >
                {isLoading ? "Stepping Down..." : "Step Down"}
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
