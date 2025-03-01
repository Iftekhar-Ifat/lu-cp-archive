"use client";

import { useState } from "react";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import DifficultyBadge from "./difficulty-badge";
import { ContestDifficultyEnum } from "@/utils/types";

type Status = {
  value: ContestDifficultyEnum;
  label: string;
};

const statuses: Status[] = [
  {
    value: "EASY",
    label: "Easy",
  },
  {
    value: "MEDIUM",
    label: "Medium",
  },
  {
    value: "HARD",
    label: "Hard",
  },
];

export function DifficultyStatus() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status>(statuses[0]);

  const handleStatusChange = async (newStatus: Status) => {
    if (selectedStatus.value === newStatus.value) {
      setLoading(true);
      // Simulate API call (set new status)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSelectedStatus(statuses[0]);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Simulate API call (set the status to null)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSelectedStatus(newStatus);
    setLoading(false);
  };

  const StatusIndicator = ({ status }: { status: Status }) => {
    if (!status) return null;
    return (
      <div className="pointer-events-none">
        <DifficultyBadge difficulty={status.value} />
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen} modal={false}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <StatusIndicator status={selectedStatus} />
            )}
            <ChevronsUpDown className="ml-auto opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[150px] p-0" align="start">
          <StatusList
            setOpen={setOpen}
            onStatusChange={handleStatusChange}
            selectedStatus={selectedStatus}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {loading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <StatusIndicator status={selectedStatus} />
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList
            setOpen={setOpen}
            onStatusChange={handleStatusChange}
            selectedStatus={selectedStatus}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function StatusList({
  setOpen,
  onStatusChange,
  selectedStatus,
}: {
  setOpen: (open: boolean) => void;
  onStatusChange: (status: Status) => void;
  selectedStatus: Status;
}) {
  return (
    <Command>
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              onSelect={(value) => {
                const newStatus =
                  statuses.find((s) => s.value === value) || statuses[0];
                onStatusChange(newStatus);
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div className="pointer-events-none">
                  <DifficultyBadge difficulty={status.value} />
                </div>
                {selectedStatus.value === status.value && (
                  <Check className="ml-auto h-4 w-4" />
                )}
              </div>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
