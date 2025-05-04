"use client";

import { useQuery } from "@tanstack/react-query";
import { CFProblemTable } from "./cf-problem-table";
import { cf_problem_columns } from "./cf-problem-table-columns";
import { getCFProblemsByDifficulty } from "../../../app/dashboard/codeforces-ladder/cf-ladder-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";
import { useStrictSession } from "@/hooks/use-strict-session";
import { getUserById } from "@/components/shared-actions/getUserData";

export default function CFProblemTableWrapper({
  difficultyLevel,
}: {
  difficultyLevel: number;
}) {
  const session = useStrictSession();

  const {
    data: cfProblemData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [difficultyLevel.toString()],
    queryFn: async () => {
      const result = await getCFProblemsByDifficulty(difficultyLevel);
      return unwrapActionResult(result);
    },
    staleTime: Infinity,
  });

  const { data: userData } = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const result = await getUserById(session.user.id);
      return unwrapActionResult(result);
    },
    staleTime: Infinity,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !cfProblemData) {
    if (!cfProblemData) {
      return <Error message={error?.message} refetch={refetch} />;
    }
  }

  return (
    <CFProblemTable
      columns={cf_problem_columns}
      data={cfProblemData}
      difficultyLevel={difficultyLevel}
      cf_handle={userData?.cf_handle ?? undefined}
    />
  );
}
