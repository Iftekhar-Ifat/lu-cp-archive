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
import { isActionError, unwrapActionResult } from "@/utils/error-helper";
import { toast } from "sonner";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserById } from "@/components/shared-actions/actions";
import CodeforcesForm, {
  type CodeforcesFormValues,
} from "@/components/profile/codeforces-settings-form";
import { CF_CACHE_LS_KEY } from "@/components/codeforces-ladder/check-problem-solved/check-solved-problems";
import { localStorageCleanUp } from "@/utils/helper";
import { updateCFProfile } from "../profile-actions";
import { type users } from "@prisma/client";
import { useStrictSession } from "@/hooks/use-strict-session";

export default function CodeforcesSettings({ userData }: { userData: users }) {
  const session = useStrictSession();
  const isOwner = session.user.id === userData.id;
  const [isEditing, setIsEditing] = useState(false);

  const queryClient = useQueryClient();

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-cf-info", userData.user_name],
    queryFn: async () => {
      const result = await getUserById(userData.id);
      return unwrapActionResult(result);
    },
    initialData: userData,
    staleTime: Infinity,
  });

  const handleSubmit = async (data: CodeforcesFormValues) => {
    const result = await updateCFProfile({
      handle: data.handle || null,
      showOnLeaderboard: data.showOnLeaderboard,
      profileOwnerId: userData.id,
    });

    if (isActionError(result)) {
      toast.error(result.error, { position: "top-center" });
    } else {
      // clean up localstorage for `cfProblemCache`
      localStorage.removeItem(CF_CACHE_LS_KEY);

      toast.success("Status Updated", { position: "top-center" });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["user-cf-info"] });
    }
  };

  const handleRemoveCFHandle = async () => {
    const result = await updateCFProfile({
      handle: null,
      showOnLeaderboard: false,
      profileOwnerId: userData.id,
    });

    if (isActionError(result)) {
      toast.error(result.error, { position: "top-center" });
    } else {
      // clean up localstorage for `cfProblemCache`
      localStorageCleanUp();

      toast.success("Codeforces handle removed", { position: "top-center" });
      queryClient.invalidateQueries({ queryKey: ["user-cf-info"] });
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

          {isOwner ? (
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
          ) : null}
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
            isOwner={isOwner}
            onSubmit={handleSubmit}
            onRemoveHandle={handleRemoveCFHandle}
          />
        )}
      </CardContent>
    </Card>
  );
}
