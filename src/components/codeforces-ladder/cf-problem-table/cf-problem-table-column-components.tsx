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
import { Button, buttonVariants } from "@/components/ui/button";
import { Check, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { type z } from "zod";
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
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { isActionError } from "@/utils/error-helper";
import { useQueryClient } from "@tanstack/react-query";
import {
  CFDifficultyLevels,
  CFProblemFormSchema,
} from "@/utils/schema/cf-problem";
import {
  deleteCFProblem,
  updateCFProblem,
} from "@/app/dashboard/codeforces-ladder/cf-ladder-actions";
import { type CFProblem } from "@/types/types";
import CFDifficultySelect from "@/components/shared/cf-difficulty-select";
import { approveCFProblem } from "@/app/dashboard/codeforces-ladder/approve-problem/approve-cf-actions";

export function DeleteCFproblemModal({
  problem_id,
  revalidateKey,
}: {
  problem_id: string;
  revalidateKey: string;
}) {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await deleteCFProblem(problem_id);
      if (isActionError(result)) {
        toast.error(result.error, {
          position: "top-center",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [revalidateKey] });
        toast.success("Problem successfully deleted", {
          position: "top-center",
        });
        setOpen(false);
      }
    } catch (error) {
      console.error(`Failed to delete problem:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
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
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete This Problem?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove this problem?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({
              variant: "destructive",
            })}
            onClick={handleDelete}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

type CFProblemFormValues = z.infer<typeof CFProblemFormSchema>;

export function CFProblemEditModal({
  cf_problem,
  revalidateKey,
}: {
  cf_problem: CFProblem;
  revalidateKey: string;
}) {
  const [open, setOpen] = useState(false);

  const queryClient = useQueryClient();

  const form = useForm<CFProblemFormValues>({
    resolver: zodResolver(CFProblemFormSchema),
    defaultValues: {
      title: cf_problem.title,
      url: cf_problem.url,
      difficulty_level: cf_problem.difficulty_level,
    },
  });

  const onSubmit = async (data: CFProblemFormValues) => {
    const result = await updateCFProblem(data, cf_problem.id);

    if (isActionError(result)) {
      toast.error(result.error, {
        position: "top-center",
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: [revalidateKey],
      });
      toast.success("Problem successfully updated.", {
        position: "top-center",
      });

      form.reset();
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Edit className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-[95%] font-sans sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Submit Problem</DialogTitle>
          <DialogDescription>
            Submit a new problem with details and difficulty level.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* CF Problem Name Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter problem name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Problem Link Field */}
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Problem Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://codeforces.com/problemset/problem/4/A"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficulty Select Section */}
            <FormField
              control={form.control}
              name="difficulty_level"
              render={({ field }) => (
                <FormItem className="space-x-2 space-y-2">
                  <FormLabel>Difficulty Level</FormLabel>
                  <FormControl>
                    <CFDifficultySelect
                      value={field.value}
                      onChange={field.onChange}
                      levels={CFDifficultyLevels}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
              <DialogClose asChild>
                <Button type="button" variant="secondary">
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Problem"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export function ApproveCFProblem({
  cf_problem,
  revalidateKey,
}: {
  cf_problem: CFProblem;
  revalidateKey: string;
}) {
  const queryClient = useQueryClient();

  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async () => {
    try {
      setIsApproving(true);
      const result = await approveCFProblem(cf_problem.id);

      if (isActionError(result)) {
        toast.error(result.error, {
          position: "top-center",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [revalidateKey] });
        toast.success("Problem Approved", {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(`Failed to update problem:`, error);
    } finally {
      setIsApproving(false);
    }
  };
  return (
    <Button variant="outline" onClick={handleApprove} disabled={isApproving}>
      {isApproving ? (
        <Loader2
          className="h-4 w-4 animate-spin text-muted-foreground"
          size={20}
        />
      ) : (
        <Check className="h-4 w-4 text-green-500" />
      )}
    </Button>
  );
}
