"use client";

import { useState } from "react";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Icons } from "@/components/icons";
import { Trophy } from "lucide-react";
import { Pencil } from "lucide-react";

const CodeforcesFormSchema = z.object({
  handle: z.string().min(1, { message: "Codeforces handle is required" }),
  showOnLeaderboard: z.boolean(),
});

type CodeforcesFormValues = z.infer<typeof CodeforcesFormSchema>;

export default function CodeforcesSettings() {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CodeforcesFormValues>({
    resolver: zodResolver(CodeforcesFormSchema),
    defaultValues: {
      handle: "ryu",
      showOnLeaderboard: true,
    },
  });

  const onSubmit = async (data: CodeforcesFormValues) => {
    console.log(data);
    /* const result = await updateUserCompetitiveProfile(
      data.handle,
      data.showOnLeaderboard
    );
    if (!result.error) {
      setIsEditing(false);
    } */
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="handle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Codeforces Handle</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your Codeforces handle"
                        {...field}
                        disabled={!isEditing}
                      />
                    </FormControl>
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
                <Button type="submit">
                  {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
