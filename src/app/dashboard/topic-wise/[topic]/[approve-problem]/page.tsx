type ApproveProblemPageProps = {
  params: { topic: string };
};

export default function ApproveProblem({ params }: ApproveProblemPageProps) {
  console.log(params.topic);
  return <div>ApproveProblem</div>;
}
