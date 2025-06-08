"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Trophy, Trash2 } from "lucide-react";
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
} from "@/components/ui/alert-dialog";

export const CodeforcesFormSchema = z.object({
  handle: z.string().optional(),
  showOnLeaderboard: z.boolean(),
});

export type CodeforcesFormValues = z.infer<typeof CodeforcesFormSchema>;

interface CodeforcesFormProps {
  defaultValues: CodeforcesFormValues;
  isEditing: boolean;
  isOwner: boolean;
  onSubmit: (data: CodeforcesFormValues) => Promise<void>;
  onRemoveHandle: () => Promise<void>;
}

export default function CodeforcesForm({
  defaultValues,
  isEditing,
  onSubmit,
  isOwner,
  onRemoveHandle,
}: CodeforcesFormProps) {
  const form = useForm<CodeforcesFormValues>({
    resolver: zodResolver(CodeforcesFormSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="handle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Codeforces Handle</FormLabel>
                <div className="flex gap-2">
                  <FormControl>
                    <Input
                      placeholder="Enter your Codeforces handle"
                      {...field}
                      disabled={!isEditing}
                    />
                  </FormControl>
                  {isOwner && defaultValues.handle && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          title="Remove handle"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="max-w-[95%] font-sans sm:max-w-[425px]">
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Remove Codeforces Handle
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to remove your Codeforces
                            handle?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className={buttonVariants({
                              variant: "destructive",
                            })}
                            onClick={onRemoveHandle}
                          >
                            Remove
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="showOnLeaderboard"
            render={({ field }) => (
              <FormItem className="rounded-lg border p-4">
                <div className="flex items-start space-x-4">
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center">
                      <Trophy className="mr-2 h-4 w-4 text-muted-foreground" />
                      <Label className="font-medium">
                        Appear on Leaderboard
                      </Label>
                    </div>
                    <p className="text-[13px] text-muted-foreground">
                      Enable this option to display your profile on the
                      leaderboard
                    </p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={!isEditing}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        </div>

        {isEditing && (
          <div className="flex items-center justify-end pt-2">
            <Button type="submit" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </form>
    </Form>
  );
}
