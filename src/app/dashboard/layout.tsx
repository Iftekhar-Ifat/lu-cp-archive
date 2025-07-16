import MaxWidthWrapper from "@/components/max-width-wrapper";
import { type ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <MaxWidthWrapper>{children}</MaxWidthWrapper>;
}
