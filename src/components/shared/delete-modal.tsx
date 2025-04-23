import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { isActionError } from "@/utils/error-helper";
import { useQueryClient } from "@tanstack/react-query";
import { type SetStateAction, useState } from "react";
import { type Dispatch } from "react";
import { toast } from "sonner";

type ItemType = "Contest" | "Problem" | "Topic";

export function DeleteModal({
  isOpen,
  setIsOpen,
  itemType,
  actionFunction,
  revalidateKey,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  itemType: ItemType;
  actionFunction: () => Promise<unknown>;
  revalidateKey?: string;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const queryClient = useQueryClient();

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const result = await actionFunction();
      if (isActionError(result)) {
        toast.error(result.error, {
          position: "top-center",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [revalidateKey] });
        toast.success(`${itemType} successfully deleted`, {
          position: "top-center",
        });
        setIsOpen(false);
      }
    } catch (error) {
      console.error(`Failed to delete ${itemType.toLowerCase()}:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95%] font-sans sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">Delete {itemType}</DialogTitle>
          <DialogDescription>
            {`Are you sure you want to delete this ${itemType.toLowerCase()}? This action cannot be undone.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="gap-2">
          <div className="flex justify-end space-x-2">
            <Button
              variant="secondary"
              onClick={() => setIsOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
