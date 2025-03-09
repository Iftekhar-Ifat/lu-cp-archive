import { Suspense } from "react";
import AddTopicSection from "./_components/add-topic-section";
import TopicWiseCardSection from "./_components/topic-wise-card-section";

export default async function TopicWise() {
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Topic Wise Problems
          </span>
        </div>
        <AddTopicSection />
      </div>
      <Suspense fallback={"Loading..."}>
        <TopicWiseCardSection />
      </Suspense>
    </div>
  );
}
