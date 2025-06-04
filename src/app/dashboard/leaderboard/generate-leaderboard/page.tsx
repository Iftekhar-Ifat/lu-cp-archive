import GenerateButton from "./_components/generate-button";

export default function GenerateLeaderboardPage() {
  return (
    <div className="py-8">
      <div className="mb-8 flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <span className="text-center font-mono text-2xl font-bold tracking-wide md:text-left">
            Generate Leaderboard
          </span>
        </div>
      </div>
      <GenerateButton />
    </div>
  );
}
