"use client";

import Loading from "@/app/loading";
import { getStandardUsers } from "@/app/profile/[user_name]/profile-actions";
import { StandardUsersTable } from "@/components/profile/user-management/standard-users-table";
import { standard_users_table_columns } from "@/components/profile/user-management/standard-users-table-column";
import Error from "@/components/shared/error";
import { useStrictSession } from "@/hooks/use-strict-session";
import { unwrapActionResult } from "@/utils/error-helper";
import { useQuery } from "@tanstack/react-query";
import { User } from "lucide-react";

export default function UsersTableWrapper() {
  const session = useStrictSession();
  const {
    data: standardUsers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["standard-users"],
    queryFn: async () => {
      const result = await getStandardUsers();
      return unwrapActionResult(result);
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !standardUsers) {
    if (!standardUsers) {
      return <Error message={error?.message} refetch={refetch} />;
    }
  }
  return (
    <div>
      <div>
        <h3 className="flex items-center text-xl font-medium">
          <User className="mr-1 text-muted-foreground" />
          Users
        </h3>
        {
          <div className="my-4">
            <StandardUsersTable
              userType={session.user.user_type}
              columns={standard_users_table_columns}
              data={standardUsers}
            />
          </div>
        }
      </div>
    </div>
  );
}
