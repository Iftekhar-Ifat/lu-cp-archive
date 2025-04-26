"use client";

import { type SetStateAction, useState } from "react";
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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { type ProblemDifficulty } from "@/types/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { DifficultyStatus } from "../shared/difficulty-status";
import {
  MAX_PROBLEM_TAG_LENGTH,
  ProblemFormSchema,
} from "@/utils/schema/problem";
import { createProblemAction } from "@/app/dashboard/topic-wise/[topic]/actions";
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputList,
} from "../ui/tags-input";

type ProblemFormValues = z.infer<typeof ProblemFormSchema>;

export default function ProblemAddModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<ProblemDifficulty>("EASY");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<ProblemFormValues> = {
    title: "",
    description: "",
    url: "",
    tags: [],
  };

  const form = useForm<ProblemFormValues>({
    resolver: zodResolver(ProblemFormSchema),
    defaultValues,
  });

  const { setValue, setError } = form;

  const handleTags = (newTags: SetStateAction<string[]>) => {
    console.log(newTags);
    const currentTags = form.getValues("tags") || [];
    const tags = typeof newTags === "function" ? newTags(currentTags) : newTags;

    if (tags.length > MAX_PROBLEM_TAG_LENGTH) {
      setError("tags", {
        type: "manual",
        message: "Maximum 5 tags allowed",
      });
      return;
    }

    const formattedTags = tags.map((tag) =>
      tag.toLowerCase().replace(/\s+/g, "-")
    );

    setValue("tags", formattedTags, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDifficultyChange = (difficulty: ProblemDifficulty) => {
    setSelectedDifficulty(difficulty);
  };

  const onSubmit = async (data: ProblemFormValues) => {
    setIsSubmitting(true);
    try {
      const result = await createProblemAction({
        ...data,
        difficulty: selectedDifficulty,
        name: "",
        link: "",
      });

      if (result.success) {
        toast.success("Problem successfully added", {
          position: "top-center",
        });

        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open && !isSubmitting) {
          form.reset();
        }
        setIsOpen(open);
      }}
    >
      <DialogContent className="max-w-[95%] font-sans sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Add Problem</DialogTitle>
          <DialogDescription>
            Create a new problem with details and difficulty level.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Problem Name Field */}
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

            {/* Problem Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the problem"
                      className="min-h-[100px] resize-none"
                      maxLength={ProblemFormSchema.shape.description.maxLength!}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end text-xs">
                    {form.watch("description")?.length || 0}/
                    {ProblemFormSchema.shape.description.maxLength} characters
                  </FormDescription>
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

            {/* Tags Section */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsInput
                      className="[&_input]:border-none [&_input]:outline-none [&_input]:ring-0 [&_input]:focus:border-none [&_input]:focus:ring-0 [&_input]:focus-visible:ring-0"
                      value={field.value || []}
                      onInvalid={(tag) => {
                        field.value.includes(tag)
                          ? toast.error(`${tag} already exists.`)
                          : null;
                      }}
                      onValueChange={handleTags}
                      editable
                      addOnPaste
                    >
                      <TagsInputList>
                        {field.value.map((tag) => (
                          <TagsInputItem key={tag} value={tag}>
                            {tag}
                          </TagsInputItem>
                        ))}
                        <TagsInputInput placeholder="Add tags" />
                      </TagsInputList>
                    </TagsInput>
                  </FormControl>
                  <FormDescription className="text-xs">
                    Add at least one tag (max 5) related to the problem
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Difficulty Status Section */}
            <div className="space-x-2 space-y-2">
              <FormLabel>Difficulty Level</FormLabel>
              <DifficultyStatus
                onDifficultyChange={handleDifficultyChange}
                initialDifficulty="EASY"
              />
            </div>

            <DialogFooter className="flex-col gap-2 sm:flex-row sm:gap-0">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsOpen(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
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
