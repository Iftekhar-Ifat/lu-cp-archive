"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { Pencil } from "lucide-react";
import { useStrictSession } from "@/hooks/use-strict-session";
import { updateCFProfile } from "../profile-actions";
import { isActionError, unwrapActionResult } from "@/utils/error-helper";
import { toast } from "sonner";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserById } from "@/components/shared-actions/getUserData";
import CodeforcesForm, {
  type CodeforcesFormValues,
} from "@/components/profile/codeforces-settings-form";

export default function CodeforcesSettings() {
  const session = useStrictSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["user-cf-info"],
    queryFn: async () => {
      const result = await getUserById(session.user.id);
      return unwrapActionResult(result);
    },
    staleTime: Infinity,
  });

  const handleSubmit = async (data: CodeforcesFormValues) => {
    const result = await updateCFProfile(
      {
        handle: data.handle || null,
        showOnLeaderboard: data.showOnLeaderboard,
      },
      session.user.id
    );

    if (isActionError(result)) {
      toast.error(result.error, { position: "top-center" });
    } else {
      // clean up localstorage for `cfProblemCache`
      localStorage.removeItem("cfSolvedCache");

      toast.success("Status Updated", { position: "top-center" });
      setIsEditing(false);
      refetch();
    }
  };

  const handleRemoveCFHandle = async () => {
    const result = await updateCFProfile(
      {
        handle: null,
        showOnLeaderboard: false,
      },
      session.user.id
    );

    if (isActionError(result)) {
      toast.error(result.error, { position: "top-center" });
    } else {
      // clean up localstorage for `cfProblemCache`
      localStorage.removeItem("cfSolvedCache");

      toast.success("Codeforces handle removed", { position: "top-center" });
      refetch();

      setIsDialogOpen(false);
    }
  };

  const defaultValues = {
    handle: user?.cf_handle ?? "",
    showOnLeaderboard: user?.show_on_leaderboard ?? false,
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="rounded bg-accent p-2">
              <Icons.codeforces className="h-6 w-6" />
            </div>
            <CardTitle className="flex gap-2 text-xl">
              Codeforces Settings
            </CardTitle>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1.5"
            onClick={() => setIsEditing((prev) => !prev)}
            disabled={isLoading || isError}
          >
            {!isEditing && <Pencil className="h-3.5 w-3.5" />}
            {isEditing ? "Cancel" : "Edit"}
          </Button>
        </div>
        <CardDescription>
          Connect your Codeforces account and manage your preferences
        </CardDescription>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        ) : isError || !user ? (
          <p className="text-destructive">Failed to load Codeforces data.</p>
        ) : (
          <CodeforcesForm
            defaultValues={defaultValues}
            isEditing={isEditing}
            isSubmitting={false}
            hasExistingHandle={!!user.cf_handle}
            onSubmit={handleSubmit}
            onRemoveHandle={handleRemoveCFHandle}
            isDialogOpen={isDialogOpen}
            setIsDialogOpen={setIsDialogOpen}
          />
        )}
      </CardContent>
    </Card>
  );
}
