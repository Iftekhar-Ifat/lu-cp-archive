export function processCFdata(userCFdata, cfProblemsDB) {
    let allAttemptedFromCF = userCFdata.result;

    let allSolvedFromCF = [];
    allAttemptedFromCF.forEach(problem => {
        if (problem.verdict === 'OK') {
            let problemContestId = problem.problem.contestId;
            let problemIndex = problem.problem.index;
            let solvedProblemData = problemContestId + problemIndex;
            allSolvedFromCF.push(solvedProblemData);
        }
    });

    cfProblemsDB.forEach(problemFromDB => {
        const problemURL = problemFromDB.url;
        const dbProblemSplit = problemURL.split('/');
        const dbProblemIndex = dbProblemSplit[dbProblemSplit.length - 1];
        let dbProblemContestId;
        if (dbProblemSplit[dbProblemSplit.length - 2] === 'problem') {
            dbProblemContestId = dbProblemSplit[dbProblemSplit.length - 3];
        } else {
            dbProblemContestId = dbProblemSplit[dbProblemSplit.length - 2];
        }

        const dbProblemData = dbProblemContestId + dbProblemIndex;

        for (let i = 0; i < allSolvedFromCF.length; i++) {
            if (allSolvedFromCF[i] === dbProblemData) {
                problemFromDB.verdict = 'AC';
                break;
            }
        }
    });
    return cfProblemsDB;
}
