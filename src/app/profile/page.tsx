import MaxWidthWrapper from "@/components/max-width-wrapper";
import UserHeading from "./_components/user-heading";
import ActivityStats from "./_components/activity-stats";
import CodeforcesSettings from "./_components/codeforces-settings";

export default function Profile() {
  return (
    <MaxWidthWrapper>
      <div className="py-8">
        <UserHeading />
        <div className="grid items-start gap-6 md:grid-cols-2">
          <ActivityStats />
          <CodeforcesSettings />
        </div>
      </div>
    </MaxWidthWrapper>
  );
}
