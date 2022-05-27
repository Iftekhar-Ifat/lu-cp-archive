import Colors from "../../styles/colors";
export function processData(userProblems, allProblems) {
    if (userProblems) {
        const solving = userProblems.status.solving;
        const solved = userProblems.status.solved;
        const reviewing = userProblems.status.reviewing;
        const skipped = userProblems.status.skipped;

        let solvingProblem = 0;
        let solvedProblem = 0;
        let reviewingProblem = 0;
        let skippedProblem = 0;

        allProblems.map((problem) =>
            solving.forEach((element) => {
                if (element === problem.url) {
                    Object.assign(problem, { color: Colors.orange });
                    solvingProblem++;
                }
            })
        );

        allProblems.map((problem) =>
            solved.forEach((element) => {
                if (element === problem.url) {
                    Object.assign(problem, { color: Colors.green });
                    solvedProblem++;
                }
            })
        );

        allProblems.map((problem) =>
            reviewing.forEach((element) => {
                if (element === problem.url) {
                    Object.assign(problem, { color: Colors.violet });
                    reviewingProblem++;
                }
            })
        );

        allProblems.map((problem) =>
            skipped.forEach((element) => {
                if (element === problem.url) {
                    Object.assign(problem, { color: Colors.red });
                    skippedProblem++;
                }
            })
        );

        const userProblemStatus = {
            solving: solvingProblem,
            solved: solvedProblem,
            reviewing: reviewingProblem,
            skipped: skippedProblem,
        };
        return userProblemStatus;
    }
}
