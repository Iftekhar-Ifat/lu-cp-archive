import { fetchTopicData } from "@/lib/fetch";
import TopicWiseCard from "../../_components/topic-wise-card";

export default async function ApproveTopicCardSection() {
  const approveTopicData = await fetchTopicData();

  if (!approveTopicData) return null;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {approveTopicData.map((topic) => (
        <TopicWiseCard key={topic.id} topic={topic} approveTopicCard={true} />
      ))}
    </div>
  );
}
