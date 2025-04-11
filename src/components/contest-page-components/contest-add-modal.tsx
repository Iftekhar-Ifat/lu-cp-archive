"use client";

import { type SetStateAction, useState } from "react";
import { type Tag, TagInput } from "emblor";
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
import { type ContestDifficultyType } from "@/types/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { contestFormSchema } from "@/utils/schema/contest-form";
import { DifficultyStatus } from "../shared/difficulty-status";
import { type ContestType } from "@prisma/client";
import { createContestAction } from "@/app/dashboard/(contests)/_actions/contest-actions";
import { isActionError } from "@/utils/error-helper";

type ContestFormValues = z.infer<typeof contestFormSchema>;

export default function ContestAddModal({
  isOpen,
  setIsOpen,
  contestType,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  contestType: ContestType;
}) {
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<ContestDifficultyType>("EASY");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<ContestFormValues> = {
    name: "",
    description: "",
    link: "",
    tags: [],
  };

  const form = useForm<ContestFormValues>({
    resolver: zodResolver(contestFormSchema),
    defaultValues,
  });

  const { setValue } = form;

  const handleSetTags = (newTags: SetStateAction<Tag[]>) => {
    const currentTags = form.getValues("tags") || [];
    const tags = typeof newTags === "function" ? newTags(currentTags) : newTags;

    const formattedTags = tags.map((tag) => ({
      ...tag,
      text: tag.text.toLowerCase().replace(/\s+/g, "-"),
    }));

    setValue("tags", formattedTags, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDifficultyChange = (difficulty: ContestDifficultyType) => {
    setSelectedDifficulty(difficulty);
  };

  const onSubmit = async (data: ContestFormValues) => {
    setIsSubmitting(true);

    const result = await createContestAction(
      {
        ...data,
        difficulty: selectedDifficulty,
      },
      contestType
    );

    if (isActionError(result)) {
      toast.error(result.error, {
        position: "top-center",
      });
    } else {
      toast.success("Contest successfully added", {
        position: "top-center",
      });

      form.reset();
      setIsOpen(false);
    }

    setIsSubmitting(false);
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
          <DialogTitle>Add Contest</DialogTitle>
          <DialogDescription>
            Create a new contest with details and difficulty level.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Contest Name Field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contest Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter contest name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contest Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the contest"
                      className="min-h-[100px] resize-none"
                      maxLength={contestFormSchema.shape.description.maxLength!}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end text-xs">
                    {form.watch("description")?.length || 0}/
                    {contestFormSchema.shape.description.maxLength} characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Contest Link Field */}
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contest Link</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://example.com/contest"
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
                    <TagInput
                      tags={field.value || []}
                      setTags={handleSetTags}
                      placeholder="Add a tag"
                      activeTagIndex={activeTagIndex}
                      styleClasses={{
                        input: "mb-2",
                        tag: {
                          body: "pl-2",
                        },
                        tagList: {
                          container: "flex flex-wrap",
                        },
                      }}
                      setActiveTagIndex={setActiveTagIndex}
                      inlineTags={false}
                      showCount={true}
                      maxTags={5}
                      inputFieldPosition="top"
                    />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Add at least one tag (max 5) related to the contest
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
                  "Save Contest"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
