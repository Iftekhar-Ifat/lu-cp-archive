import { auth } from "@/lib/auth";
import { hasPermission } from "@/utils/permissions";
import { notFound } from "next/navigation";
import UsersTableWrapper from "./_components/users-table-wrapper";

export default async function ManageUsersPage() {
  const session = await auth();

  if (!session || !hasPermission(session.user.user_type, "mutate-user")) {
    notFound();
  }

  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Manage Users
          </span>
        </div>
      </div>
      <UsersTableWrapper />
    </div>
  );
}
