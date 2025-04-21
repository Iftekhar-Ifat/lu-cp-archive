import { InboxIcon } from "lucide-react";

export default function NoData({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="grid min-h-[200px] place-items-center rounded-lg border-2 border-dashed p-8">
      <div className="text-center">
        <InboxIcon className="mx-auto h-12 w-12 text-muted-foreground" />
        <h3 className="mt-4 text-lg font-semibold">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
}
