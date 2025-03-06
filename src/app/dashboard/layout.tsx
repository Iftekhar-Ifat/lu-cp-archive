import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserProvider from "@/components/user-provider";
import { type User } from "@/utils/types";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // TODO: Fetch user data from the database
  /* let userData = null;
  const user = await currentUser();

  if (user) {
    userData = await prisma.user.findUnique({
      where: {
        email: user?.primaryEmailAddress?.emailAddress,
      },
    });
  } */
  await new Promise((resolve) => setTimeout(resolve, 5000));

  const userData: User = {
    userId: "1",
    email: "iftekhar@gmail.com",
    name: "Iftekhar",
    userName: "iftekhar",
    userType: "ADMIN",
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return (
    <MaxWidthWrapper>
      <UserProvider user={userData}>{children}</UserProvider>
    </MaxWidthWrapper>
  );
}
