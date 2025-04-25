"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { type SetStateAction, type Dispatch } from "react";
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
import { updateTopic } from "../topic-actions";
import { TopicFormSchema } from "@/utils/schema/topic-form";
import { isActionError } from "@/utils/error-helper";
import { useQueryClient } from "@tanstack/react-query";

type TopicWiseFormValues = z.infer<typeof TopicFormSchema>;

export default function TopicEditModal({
  isOpen,
  setIsOpen,
  topic,
  revalidateKey,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  topic: Topic;
  revalidateKey: string;
}) {
  const queryClient = useQueryClient();

  const form = useForm<TopicWiseFormValues>({
    resolver: zodResolver(TopicFormSchema),
    defaultValues: {
      title: topic.title,
      description: topic.description,
    },
  });

  const onSubmit = async (data: TopicWiseFormValues) => {
    const result = await updateTopic(data, topic.id);

    if (isActionError(result)) {
      toast.error(result.error, {
        position: "top-center",
      });
    } else {
      queryClient.invalidateQueries({ queryKey: [revalidateKey] });
      toast.success("Topic Updated", {
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
