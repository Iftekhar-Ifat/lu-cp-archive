export function processCFdata(userCFdata, cfProblems) {
    if (userCFdata) {
        let solvedCFproblems = [];
        userCFdata.result.map((submissions) => {
            if (submissions.verdict === "OK") {
                const problemContestId = submissions.contestId;
                const problemIndex = submissions.problem.index;
                const problemData = problemContestId + problemIndex;
                solvedCFproblems.push(problemData);
            }
        });

        cfProblems.map((dbProblem) => {
            const problemURL = dbProblem.url;
            const dbProblemSplit = problemURL.split("/");
            const dbProblemIndex = dbProblemSplit[dbProblemSplit.length - 1];
            let dbProblemContestId;
            if (dbProblemSplit[dbProblemSplit.length - 2] === "problem") {
                dbProblemContestId = dbProblemSplit[dbProblemSplit.length - 3];
            } else {
                dbProblemContestId = dbProblemSplit[dbProblemSplit.length - 2];
            }

            const dbProblemData = dbProblemContestId + dbProblemIndex;

            for (let i = 0; i < solvedCFproblems.length; i++) {
                if (solvedCFproblems[i] === dbProblemData) {
                    Object.assign(dbProblem, { verdict: "AC" });
                    break;
                }
            }
        });

        return cfProblems;
    }
}
