import axios from 'axios';
import moment from 'moment';

async function getTotalProblemsSolvedLastMonthCF(
    userHandle,
    userCurrentRating
) {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.status?handle=${userHandle}`
            );
            const submissions = response.data.result;

            const cutoffDate = moment().subtract(1, 'month');
            let aboveRating = 0;
            let belowRating = 0;

            for (const submission of submissions) {
                const submissionDate = moment.unix(
                    submission.creationTimeSeconds
                );
                if (submissionDate.isBefore(cutoffDate)) {
                    break;
                }

                if (submission.verdict === 'OK') {
                    if (submission.problem.rating > userCurrentRating) {
                        aboveRating++;
                    } else {
                        belowRating++;
                    }
                }
            }

            return {
                aboveRating: aboveRating,
                belowRating: belowRating,
            };
        } catch (error) {
            if (error.response && error.response.status === 503) {
                console.log(
                    'Codeforces API is temporarily unavailable. Retrying in a moment...'
                );
                retries++;
                await waitBeforeRetry(retries);
            } else {
                console.log(
                    'An error occurred while fetching user submissions:',
                    error.message
                );
            }
        }
    }

    console.log(
        'Exceeded maximum retries. Unable to fetch user submissions from Codeforces API.'
    );
    return null;
}

async function getUserRatingCF(userHandle) {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const response = await axios.get(
                `https://codeforces.com/api/user.info?handles=${userHandle}`
            );
            const result = response.data.result[0];
            const userRating = result.rating;

            return userRating;
        } catch (error) {
            if (error.response && error.response.status === 503) {
                console.log(
                    'Codeforces API is temporarily unavailable. Retrying in a moment...'
                );
                retries++;
                await waitBeforeRetry(retries);
            } else {
                console.log(
                    'An error occurred while fetching user rating:',
                    error.message
                );
            }
        }
    }

    console.log(
        'Exceeded maximum retries. Unable to fetch user rating from Codeforces API.'
    );
    return null;
}

async function getTotalContestParticipationLastMonthCF(userHandle) {
    const maxRetries = 3;
    let retries = 0;

    while (retries < maxRetries) {
        try {
            const ratingChangesResponse = await axios.get(
                `https://codeforces.com/api/user.rating?handle=${userHandle}`
            );
            const ratingChanges = ratingChangesResponse.data.result.reverse();

            const cutoffDate = moment().subtract(1, 'month');
            let contestCount = 0;

            for (const change of ratingChanges) {
                const contestTime = moment.unix(change.ratingUpdateTimeSeconds);

                if (contestTime.isAfter(cutoffDate)) {
                    contestCount++;
                } else {
                    break;
                }
            }

            return contestCount;
        } catch (error) {
            if (error.response && error.response.status === 503) {
                console.log(
                    'Codeforces API is temporarily unavailable. Retrying in a moment...'
                );
                retries++;
                await waitBeforeRetry(retries);
            } else {
                console.log(
                    'An error occurred while fetching user rating changes:',
                    error.message
                );
            }
        }
    }

    console.log(
        'Exceeded maximum retries. Unable to fetch user rating changes from Codeforces API.'
    );
    return null;
}

function waitBeforeRetry(retries) {
    const delay = Math.pow(2, retries) * 1000;
    return new Promise(resolve => setTimeout(resolve, delay));
}

export {
    getTotalProblemsSolvedLastMonthCF,
    getUserRatingCF,
    getTotalContestParticipationLastMonthCF,
};
