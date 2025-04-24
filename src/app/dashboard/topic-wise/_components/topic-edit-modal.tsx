"use client";

import React, { useState } from "react";
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
import { type Topic } from "@/types/types";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { updateTopicWiseItemAction } from "../actions";
import { topicFormSchema } from "@/utils/schema/topic-form";

type TopicWiseFormValues = z.infer<typeof topicFormSchema>;

export default function TopicEditModal({
  isOpen,
  setIsOpen,
  topic,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  topic: Topic;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const defaultValues: Partial<TopicWiseFormValues> = {
    name: topic.name,
    description: topic.description,
  };

  const form = useForm<TopicWiseFormValues>({
    resolver: zodResolver(topicFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: TopicWiseFormValues) => {
    console.log(data);
    // setIsSubmitting(true);
    /* try {
      const result = await updateTopicWiseItemAction({
        id: topic.id,
        ...data,
      });

      if (result.success) {
        toast.success("Topic successfully updated", {
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
    } */
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
          <DialogTitle>Edit Topic</DialogTitle>
          <DialogDescription>
            {"Make changes to the topic. Click save when you're done."}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {/* Topic Name Field */}
            <FormField
              control={form.control}
              name="name"
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
                      maxLength={topicFormSchema.shape.description.maxLength!}
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="flex justify-end text-xs">
                    {form.watch("description")?.length || 0}/
                    {topicFormSchema.shape.description.maxLength} characters
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
                  "Save Changes"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
