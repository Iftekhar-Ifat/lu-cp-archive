/**
 * Fetches user data from Codeforces for a list of handles, including max rating,
 * contest participation count, and solved problems within a specified time window.
 *
 * This function performs multiple API requests per user (user.info, user.rating, user.status),
 * applies rate limiting and retry logic, and aggregates the results.
 *
 * - This function cannot be used as a server action because it takes way too much time to complete.
 * - It also cannot be used as an API route because it will likely exceed the time limits for API routes.
 */

/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { type AxiosError } from "axios";
import { subMonths } from "date-fns";
import Bottleneck from "bottleneck";

const CF_API = "https://codeforces.com/api";
const WINDOW_MONTHS = 4;

const limiter = new Bottleneck({
  maxConcurrent: 5,
  minTime: 200, // at least 200ms between each request ⇒ 5 req/s
});

async function limitedAxios<T>(config: Parameters<typeof axios.request>[0]) {
  return limiter.schedule(() => axios.request<T>(config));
}

async function requestWithRetry<T>(
  fn: () => Promise<T>,
  retries = 5,
  delayMs = 500
): Promise<T> {
  try {
    return await fn();
  } catch (err) {
    const axiosErr = err as AxiosError;
    if (retries > 0 && axiosErr.response?.status === 429) {
      await new Promise((r) => setTimeout(r, delayMs));
      return requestWithRetry(fn, retries - 1, delayMs * 2);
    }
    throw err;
  }
}

type Solve = {
  rating: number;
};

export async function fetchUserCFData(handles: string[]) {
  try {
    const windowStartTs = Math.floor(
      subMonths(new Date(), WINDOW_MONTHS).getTime() / 1000
    );

    const tasks = handles.map(async (handle) => {
      const userInfoResp = await requestWithRetry(() =>
        limitedAxios<any>({
          url: `${CF_API}/user.info`,
          params: { handles: handle },
        })
      );
      const regTs = userInfoResp?.data?.result[0]?.registrationTimeSeconds;
      const useWindowForRating = regTs < windowStartTs;

      const ratingResp = await requestWithRetry(() =>
        limitedAxios<any>({
          url: `${CF_API}/user.rating`,
          params: { handle },
        })
      );
      const allRatings = ratingResp?.data?.result;
      const contestsInWindow = allRatings.filter(
        (r: any) => r.ratingUpdateTimeSeconds >= windowStartTs
      );
      const ratingSet = useWindowForRating ? contestsInWindow : allRatings;
      const maxRating = ratingSet.length
        ? Math.max(...ratingSet.map((r: any) => r.newRating))
        : 0;

      const subsResp = await requestWithRetry(() =>
        limitedAxios<any>({
          url: `${CF_API}/user.status`,
          params: { handle, from: 1, count: 100000 },
        })
      );
      const submissions = subsResp?.data?.result;

      const solvesMap = submissions
        .filter(
          (s: any) =>
            s.verdict === "OK" && s.creationTimeSeconds >= windowStartTs
        )
        .reduce((acc: any, sub: any) => {
          const key = `${sub.problem.contestId}-${sub.problem.index}`;
          if (!acc[key]) acc[key] = { rating: sub.problem.rating };
          return acc;
        }, {});
      const solves = Object.values(solvesMap).sort(
        (a: any, b: any) => (b.rating ?? 0) - (a.rating ?? 0)
      ) as Solve[];

      return {
        handle,
        max_rating: maxRating,
        contest_participation: contestsInWindow.length,
        solves,
      };
    });

    const result = await Promise.all(tasks);
    return { success: true, data: result };
  } catch (error) {
    console.error("Error fetching Codeforces data:", error);
    return {
      success: false,
      error: "Failed to fetch Codeforces data.",
    };
  }
}
