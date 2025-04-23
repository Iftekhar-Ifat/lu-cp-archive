import { type MouseEvent, useState } from "react";
import { Button } from "../ui/button";
import { isActionError } from "@/utils/error-helper";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2 } from "lucide-react";

type ItemType = "Contest" | "Problem" | "Topic";

export default function ApproveButton({
  itemType,
  actionFunction,
  revalidateKey,
}: {
  itemType: ItemType;
  actionFunction: () => Promise<unknown>;
  revalidateKey?: string;
}) {
  const queryClient = useQueryClient();

  const [isApproving, setIsApproving] = useState(false);

  const handleApprove = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    try {
      setIsApproving(true);
      const result = await actionFunction();

      if (isActionError(result)) {
        toast.error(result.error, {
          position: "top-center",
        });
      } else {
        queryClient.invalidateQueries({ queryKey: [revalidateKey] });
        toast.success(`${itemType} Approved`, {
          position: "top-center",
        });
      }
    } catch (error) {
      console.error(`Failed to update ${itemType.toLowerCase()}:`, error);
    } finally {
      setIsApproving(false);
    }
  };
  return (
    <Button variant="outline" onClick={handleApprove} disabled={isApproving}>
      Approve
      {isApproving ? (
        <Loader2 className="animate-spin text-muted-foreground" size={20} />
      ) : (
        <Check className="ml-2 text-green-500" size={20} />
      )}
    </Button>
  );
}
