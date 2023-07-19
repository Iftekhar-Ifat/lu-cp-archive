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

const API = import.meta.env.VITE_BACKEND_API;

async function getUserData(currentUserEmail) {
    const userDataAPI = `${API}/users`;
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
    const leaderboardAPI = `${API}/leaderboard`;
    try {
        const result = await axios.get(leaderboardAPI);
        return result.data[0];
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getAllUserCFhandleData() {
    const userDataAPI = `${API}/users`;
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

        for (const user of users) {
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

            // Introduce a delay between each user's API call
            await waitBeforeNextUser();
        }

        return allLeaderboardData;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function sortAndAddRank(leaderboard) {
    // Filter out "point" (Just in case it gives NaN)
    leaderboard.filter(
        obj => typeof obj.point === 'number' && !isNaN(obj.point)
    );
    // Sort the array in decreasing order based on "point"
    leaderboard.sort((a, b) => b.point - a.point);

    // Add rank number to each object
    leaderboard.forEach((obj, index) => {
        obj.rank = index + 1;
    });
}

async function addPerformance(cpOfLeaderboard) {
    for (let i = 0; i < cpOfLeaderboard.length; i++) {
        cpOfLeaderboard[i].performance = parseInt(
            cpOfLeaderboard[i].performance
        );
        if (Number(cpOfLeaderboard[i].performance)) {
            cpOfLeaderboard[i].point =
                cpOfLeaderboard[i].point + cpOfLeaderboard[i].performance;
        } else {
            cpOfLeaderboard[i].performance = 0;
        }
    }
}

async function waitBeforeNextUser() {
    // Adjust the delay duration as needed
    const delay = 2000; // 2 seconds
    return new Promise(resolve => setTimeout(resolve, delay));
}

async function replaceUserData(generatedData, fetchedData) {
    for (let i = 0; i < generatedData.length; i++) {
        for (let j = 0; j < fetchedData.length; j++) {
            if (
                generatedData[i]['codeforces'] === fetchedData[j]['codeforces']
            ) {
                fetchedData[j] = generatedData[i];
                console.log(fetchedData[j]);
                break;
            }
        }
    }
}

export {
    addPerformance,
    generatePoints,
    getAllUserCFhandleData,
    getLeaderboardData,
    getUserData,
    replaceUserData,
    sortAndAddRank,
};
