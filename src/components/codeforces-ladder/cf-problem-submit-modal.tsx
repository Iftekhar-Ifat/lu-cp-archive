"use client";

import { type SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type Dispatch } from "react";
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
import CFDifficultySelect from "../shared/cf-difficulty-select";
import { submitCFProblem } from "@/app/dashboard/codeforces-ladder/cf-ladder-actions";

type CFProblemFormValues = z.infer<typeof CFProblemFormSchema>;

export default function CFProblemSubmitModal({
  isOpen,
  setIsOpen,
  revalidateKey,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  revalidateKey: string;
}) {
  const queryClient = useQueryClient();

  const form = useForm<CFProblemFormValues>({
    resolver: zodResolver(CFProblemFormSchema),
    defaultValues: {
      title: "",
      url: "",
      difficulty_level: 800,
    },
  });

  const onSubmit = async (data: CFProblemFormValues) => {
    const result = await submitCFProblem(data);

    if (isActionError(result)) {
      toast.error(result.error, {
        position: "top-center",
      });
    } else {
      queryClient.invalidateQueries({
        queryKey: [revalidateKey, "unapproved_count"],
      });
      toast.success("Problem successfully submitted. Wait for approval.", {
        position: "top-center",
      });

      form.reset();
      setIsOpen(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !form.formState.isSubmitting) {
          form.reset();
        }
        setIsOpen(open);
      }}
    >
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
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={form.formState.isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit Problem"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
