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
import { cn } from "@/lib/utils";

type Status = {
  value: string;
  label: string;
  color: string;
};

const statuses: Status[] = [
  {
    value: "skipped",
    label: "Skipped",
    color: "bg-rose-500",
  },
  {
    value: "in-progress",
    label: "In Progress",
    color: "bg-amber-500",
  },
  {
    value: "done",
    label: "Done",
    color: "bg-emerald-500",
  },
];

export function ContestStatus() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(null);

  const handleStatusChange = async (newStatus: Status | null) => {
    if (selectedStatus?.value === newStatus?.value) {
      setLoading(true);
      // Simulate API call (set new status)
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSelectedStatus(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    // Simulate API call (set the status to null)
    await new Promise((resolve) => setTimeout(resolve, 500));
    setSelectedStatus(newStatus);
    setLoading(false);
  };

  const StatusIndicator = ({ status }: { status: Status | null }) => {
    if (!status) return null;
    return (
      <div className="flex items-center gap-2">
        <div className={cn(`h-3 w-3 rounded-full`, status.color)} />
        {status.label}
      </div>
    );
  };

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : selectedStatus ? (
              <StatusIndicator status={selectedStatus} />
            ) : (
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                Set Status
              </div>
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
          ) : selectedStatus ? (
            <StatusIndicator status={selectedStatus} />
          ) : (
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-primary" />
              Set Status
            </div>
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
  onStatusChange: (status: Status | null) => void;
  selectedStatus: Status | null;
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
                  statuses.find((s) => s.value === value) || null;
                onStatusChange(newStatus);
                setOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div className={cn(`h-3 w-3 rounded-full`, status.color)} />
                {status.label}
                {selectedStatus?.value === status.value && (
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
