import axios from 'axios';
import {
    getTotalContestParticipationLastMonthCF,
    getTotalProblemsSolvedLastMonthCF,
    getUserRatingCF,
} from '../LeaderBoardComponents/CFuserStats';

const multiplier = {
    rating: 1.5,
    aboveProblem: 5,
    belowProblem: 2,
    contest: 10,
};

async function getUserData(currentUserEmail) {
    const userDataAPI = 'https://lu-cp-archive-backend.onrender.com/users';
    try {
        const result = await axios.get(userDataAPI, {
            params: { currentUserEmail: currentUserEmail },
        });
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getLeaderboardData() {
    const leaderboardAPI =
        'https://lu-cp-archive-backend.onrender.com/leaderboard';
    try {
        const result = await axios.get(leaderboardAPI);
        return result.data[0];
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getAllUserCFhandleData() {
    const userDataAPI = 'https://lu-cp-archive-backend.onrender.com/users';
    try {
        let allUserCFhandle = [];
        await axios.get(userDataAPI).then(users => {
            users.data.forEach(user => {
                let userName = user.name;
                let userHandle;
                user.handles.forEach(handleObject => {
                    if (handleObject.platform === 'codeforces') {
                        userHandle = handleObject.handle;
                    }
                });
                let eachUserObject = {
                    name: userName,
                    handle: userHandle,
                };
                if (userName && userHandle) {
                    allUserCFhandle.push(eachUserObject);
                }
            });
        });
        return allUserCFhandle;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function generatePoints() {
    try {
        let allLeaderboardData = [];
        const users = await getAllUserCFhandleData();

        await Promise.all(
            users.map(async user => {
                const userCFrating = await getUserRatingCF(user.handle);
                const totalProblemSolvedLastMonthCF =
                    await getTotalProblemsSolvedLastMonthCF(
                        user.handle,
                        userCFrating
                    );
                const totalContestParticipation =
                    await getTotalContestParticipationLastMonthCF(user.handle);

                const ratingPoint = userCFrating * multiplier.rating;
                const aboveProblemPoint =
                    totalProblemSolvedLastMonthCF.aboveRating *
                    multiplier.aboveProblem;
                const belowProblemPoint =
                    totalProblemSolvedLastMonthCF.belowRating *
                    multiplier.belowProblem;
                const contestParticipationPoint =
                    totalContestParticipation * multiplier.contest;

                const totalPoint =
                    (ratingPoint +
                        aboveProblemPoint +
                        belowProblemPoint +
                        contestParticipationPoint) /
                    10;

                const userRankData = {
                    name: user.name,
                    codeforces: user.handle,
                    point: totalPoint,
                };
                allLeaderboardData.push(userRankData);
            })
        );

        return allLeaderboardData;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

function sortAndAddRank(array) {
    // Filter out objects with non-numeric "point" property
    array = array.filter(
        obj => typeof obj.point === 'number' && !isNaN(obj.point)
    );
    // Sort the array in decreasing order based on "point"
    array.sort((a, b) => b.point - a.point);

    // Add rank number to each object
    array.forEach((obj, index) => {
        obj.rank = index + 1;
    });

    return array;
}

export {
    getUserData,
    getAllUserCFhandleData,
    generatePoints,
    sortAndAddRank,
    getLeaderboardData,
};
