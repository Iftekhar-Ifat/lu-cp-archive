"use client";

import { useQuery } from "@tanstack/react-query";
import { CFProblemTable } from "./cf-problem-table";
import { columns } from "./cf-problem-table-columns";
import { getCFProblemsByDifficulty } from "../../../app/dashboard/codeforces-ladder/cf-ladder-actions";
import { unwrapActionResult } from "@/utils/error-helper";
import Error from "@/components/shared/error";
import Loading from "@/components/shared/loading";

export default function CFProblemTableWrapper({
  difficultyLevel,
}: {
  difficultyLevel: number;
}) {
  const {
    data: cfProblemData,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: [difficultyLevel],
    queryFn: async () => {
      const result = await getCFProblemsByDifficulty(difficultyLevel);
      return unwrapActionResult(result);
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError || !cfProblemData) {
    return <Error message={error?.message} refetch={refetch} />;
  }

  return (
    <CFProblemTable
      columns={columns}
      data={cfProblemData}
      difficultyLevel={difficultyLevel}
    />
  );
}
