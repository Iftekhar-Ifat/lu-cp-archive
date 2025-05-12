import MaxWidthWrapper from "@/components/max-width-wrapper";
import UserHeading from "./_components/user-heading";
import ActivityStats from "./_components/activity-stats";
import CodeforcesSettings from "./_components/codeforces-settings";
import { parseUsername } from "@/utils/helper";
import { getUserByUserName } from "@/components/shared-actions/getUserData";
import { isActionError } from "@/utils/error-helper";
import { notFound } from "next/navigation";
import UserManagement from "./_components/user-management";

export default async function Profile({
  params,
}: {
  params: { user_name: string };
}) {
  const userName = parseUsername(params.user_name);
  const user = await getUserByUserName(userName);

  if (isActionError(user)) {
    notFound();
  }

  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <UserHeading userData={user.data} />
        <div className="grid gap-6 md:grid-cols-2">
          <ActivityStats userData={user.data} />
          <CodeforcesSettings userData={user.data} />
          {/* <UserManagement /> */}
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
