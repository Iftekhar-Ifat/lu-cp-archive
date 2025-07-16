"use client";

import { useState } from "react";
import { ChevronsUpDown, Check } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { getDifficultyColor } from "../codeforces-ladder/cf-ladder-helper";

type DifficultySelectProps = {
  value: number;
  onChange: (value: number) => void;
  levels: readonly number[];
};

export default function CFDifficultySelect({
  value,
  onChange,
  levels,
}: DifficultySelectProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);

  const DifficultyIndicator = ({ value }: { value: number }) => (
    <span className={cn("text-sm font-bold", getDifficultyColor(value))}>
      {value}
    </span>
  );

  const DifficultyList = () => (
    <Command value={value.toString()}>
      <CommandList>
        <CommandEmpty>No difficulty found.</CommandEmpty>
        <CommandGroup>
          {levels.map((level) => (
            <CommandItem
              key={level}
              value={level.toString()}
              onSelect={() => {
                onChange(level);
                setOpen(false);
              }}
            >
              <div className="flex w-full items-center justify-between">
                <DifficultyIndicator value={level} />
                {value === level && <Check className="h-4 w-4" />}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} modal={true}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start px-2">
            <DifficultyIndicator value={value} />
            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0" align="start">
          <DifficultyList />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          <DifficultyIndicator value={value} />
          <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <DifficultyList />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
