import MaxWidthWrapper from "@/components/max-width-wrapper";
import UserProvider from "@/components/user-provider";
import { type User } from "@/types/types";
import { type ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  /* const userData = await getUserData();

  if (isActionError(userData)) {
    throw new Error(userData.error);
  } */

  const userData: User = {
    id: "1",
    name: "Iftekhar",
    email: "abcd@gmail.com",
    user_name: "iftekhar",
    user_type: "STANDARD",
    created_at: new Date(),
    updated_at: new Date(),
  };

  return (
    <MaxWidthWrapper>
      <UserProvider user={userData}>{children}</UserProvider>
    </MaxWidthWrapper>
  );
}
