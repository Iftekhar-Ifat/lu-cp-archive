"use client";

import React, { SetStateAction, useState } from "react";
import { Tag, TagInput } from "emblor";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Dispatch } from "react";
import { DifficultyStatus } from "./difficulty-status";

export default function AddContestModal({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
}) {
  const [exampleTags, setExampleTags] = useState<Tag[]>([]);
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  const handleSetTags = (newTags: SetStateAction<Tag[]>) => {
    const tags = typeof newTags === "function" ? newTags(exampleTags) : newTags;
    const formattedTags = tags.map((tag) => ({
      ...tag,
      text: tag.text.toLowerCase().replace(/\s+/g, "-"),
    }));
    setExampleTags(formattedTags);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95%] sm:max-w-[425px] font-sans">
        <DialogHeader>
          <DialogTitle>Add Contest</DialogTitle>
        </DialogHeader>
        <TagInput
          tags={exampleTags}
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
        <DifficultyStatus />
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
