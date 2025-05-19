"use client";

import { AdministrativeUsersTable } from "./administrative-users-table";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/shared/loading";
import Error from "@/components/shared/error";
import { getAdministrativeUsers } from "@/app/profile/[user_name]/profile-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import { administrative_table_columns } from "./administrative-table-columns";
import { useStrictSession } from "@/hooks/use-strict-session";
import { ShieldUser, Zap } from "lucide-react";

export default function AdministrativeTableWrapper() {
  const session = useStrictSession();
  const {
    data: administrativeUsers,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["administrative-users"],
    queryFn: async () => {
      const result = await getAdministrativeUsers();

      const unwrappedResult = unwrapActionResult(result);
      if (!unwrappedResult) return undefined;

      const admin = unwrappedResult.filter((u) => u.user_type === "ADMIN");
      const power = unwrappedResult.filter((u) => u.user_type === "POWER");

      return { admin, power };
    },
    staleTime: Infinity,
  });

  if (isLoading || !administrativeUsers) {
    return <Loading />;
  }

  if (isError || !administrativeUsers) {
    if (!administrativeUsers) {
      return <Error message={error?.message} refetch={refetch} />;
    }
  }
  return (
    <div>
      <div>
        <h3 className="flex items-center text-xl font-medium">
          <ShieldUser className="mr-1 text-muted-foreground" />
          Admins
        </h3>
        <div className="my-4">
          <AdministrativeUsersTable
            userType={session.user.user_type}
            totalSlots={3}
            columns={administrative_table_columns}
            data={administrativeUsers.admin}
          />
        </div>
      </div>
      <div>
        <h3 className="flex items-center text-xl font-medium">
          <Zap className="mr-1 text-muted-foreground" />
          Power Users
        </h3>
        <div className="my-4">
          <AdministrativeUsersTable
            userType={session.user.user_type}
            totalSlots={5}
            columns={administrative_table_columns}
            data={administrativeUsers.power}
          />
        </div>
      </div>
    </div>
  );
}
