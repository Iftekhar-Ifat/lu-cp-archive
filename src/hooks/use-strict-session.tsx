import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export function useStrictSession() {
  const { data: session, status } = useSession();
  if (status !== "authenticated") {
    redirect("/");
  }
  return session;
}
