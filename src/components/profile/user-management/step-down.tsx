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

export default function StepDown() {
  const session = useStrictSession();
  return (
    <div className="rounded border p-4">
      <div className="flex flex-col items-center justify-between gap-2 md:flex-row">
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
            <Button className="md:w-fit" variant="destructive">
              Step Down
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
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
                onClick={() => console.log("first")}
              >
                Step Down
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
