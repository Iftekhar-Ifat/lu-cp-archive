"use client";

import UserTypeBadge from "../shared/user-type-badge";
import { Button, buttonVariants } from "../ui/button";
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
} from "../ui/alert-dialog";

export default function StepDown() {
  return (
    <div className="rounded-md border p-4">
      <div className="flex flex-col justify-between gap-2">
        <div>
          <h3 className="font-medium">
            Your Current Role:{" "}
            <UserTypeBadge user_type="POWER" className="text-sm" />
          </h3>
          <p className="text-sm text-muted-foreground">
            You can step down from your position if needed
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="md:w-fit md:self-end" variant="destructive">
              Step Down
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Stepping Down?</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to step down?
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
