"use client";

import { useRef, useState } from "react";
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
import { type ProblemStatusType } from "@/types/types";
import { isActionError } from "@/utils/error-helper";
import { toast } from "sonner";
import { updateProblemStatus } from "@/app/dashboard/topic-wise/[topic]/problem-actions";

type Status = {
  value: ProblemStatusType;
  label: string;
  color: string;
};

const statuses: Status[] = [
  {
    value: "SKIPPED",
    label: "Skipped",
    color: "bg-rose-500",
  },
  {
    value: "InProgress",
    label: "In Progress",
    color: "bg-amber-500",
  },
  {
    value: "DONE",
    label: "Done",
    color: "bg-emerald-500",
  },
];

export function ProblemStatus({
  problemId,
  problemStatus,
}: {
  problemId: string;
  problemStatus: ProblemStatusType;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(() => {
    const initialStatus =
      statuses.find((status) => status.value === problemStatus) || null;
    return initialStatus;
  });

  // Button ref to get the card element
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleStatusChange = async (newStatus: Status | null) => {
    try {
      setLoading(true);

      const nextStatus =
        selectedStatus?.value === newStatus?.value ? null : newStatus;

      const result = await updateProblemStatus(
        problemId,
        nextStatus?.value ?? null
      );

      if (isActionError(result)) {
        toast.error(result.error, {
          position: "top-center",
        });
      } else {
        toast.success("Status updated successfully");
        setSelectedStatus(nextStatus);
      }

      // Update the card element border
      if (buttonRef.current) {
        const cardElement = buttonRef.current.closest("[data-card]");
        if (cardElement instanceof HTMLElement) {
          cardElement.dataset.cardBorder = nextStatus?.value || undefined;
        }
      }
    } catch (error) {
      console.error("Status update failed:", error);
    } finally {
      setLoading(false);
    }
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
          <Button
            variant="outline"
            className="w-[150px] justify-start"
            ref={buttonRef}
          >
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
        <Button
          variant="outline"
          className="w-[150px] justify-start"
          ref={buttonRef}
        >
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
              value={status.value as string}
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
