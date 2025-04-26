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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { generateTitleToSlug } from "@/utils/helper";
import { TopicFormSchema } from "@/utils/schema/topic";
import { submitTopic } from "../topic-actions";

type TopicFormValues = z.infer<typeof TopicFormSchema>;

export default function TopicSubmitModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const defaultValues: Partial<TopicFormValues> = {
    title: "",
    description: "",
  };

  const form = useForm<TopicFormValues>({
    resolver: zodResolver(TopicFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: TopicFormValues) => {
    try {
      const generatedSlug = generateTitleToSlug(data.title);
      const result = await submitTopic({
        ...data,
        slug: generatedSlug,
      });

      if (result.success) {
        toast.success("Topic successfully submitted. Wait for approval.", {
          position: "top-center",
        });

        form.reset();
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
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
      <DialogContent className="max-w-[95%] font-sans sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>Submit Topic</DialogTitle>
          <DialogDescription>
            Submit a new topic with details.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Topic Title Field */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Topic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter topic name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Topic Description Field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe the topic"
                      className="min-h-[100px] resize-none"
                      maxLength={TopicFormSchema.shape.description.maxLength!}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end text-xs">
                    {form.watch("description")?.length || 0}/
                    {TopicFormSchema.shape.description.maxLength} characters
                  </FormDescription>
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
                  "Submit Topic"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
