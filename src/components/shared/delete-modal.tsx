import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { type Dispatch } from "react";

export function DeleteModal({
  isOpen,
  setIsOpen,
  itemType,
  actionFunction,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<React.SetStateAction<boolean>>;
  itemType: string;
  actionFunction: () => Promise<unknown>;
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await actionFunction();
      setIsOpen(false);
    } catch (error) {
      console.error(`Failed to delete ${itemType}:`, error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[95%] font-sans sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Delete <span className="capitalize">{itemType}</span>
          </DialogTitle>
          <DialogDescription>
            Are you sure you want to delete? This action cannot be undone.
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
