import axios from 'axios';
import moment from 'moment';

async function getTotalProblemsSolvedLastMonthCF(
    userHandle,
    userCurrentRating
) {
    // Calculate the cutoff date (one month ago)
    const cutoffDate = moment().subtract(1, 'month');

    try {
        // Fetch user submissions from Codeforces API
        const response = await axios.get(
            `https://codeforces.com/api/user.status?handle=${userHandle}`
        );
        const submissions = response.data.result;

        // Count the number of submissions within the last month
        let aboveRating = 0;
        let belowRating = 0;
        for (const submission of submissions) {
            const submissionDate = moment.unix(submission.creationTimeSeconds);
            if (submissionDate.isBefore(cutoffDate)) {
                // Break the loop if the submission is older than one month
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
        return error.message;
    }
}

async function getUserRatingCF(userHandle) {
    try {
        // Fetch user rating from Codeforces API
        const response = await axios.get(
            `https://codeforces.com/api/user.info?handle=${userHandle}`
        );
        const result = response.data.result[0];
        const userRating = result.rating;

        return userRating;
    } catch (error) {
        return error.message;
    }
}

async function getTotalContestParticipationLastMonthCF(userHandle) {
    // Calculate the cutoff date (one month ago)
    const cutoffDate = moment().subtract(1, 'month');
    try {
        // Fetch user rating from Codeforces API
        const ratingChangesResponse = await axios.get(
            `https://codeforces.com/api/user.rating?handle=${userHandle}`
        );
        const ratingChanges = ratingChangesResponse.data.result.reverse();

        // Initialize contest count
        let contestCount = 0;

        // Iterate over rating changes until contest time is one month
        for (const change of ratingChanges) {
            const contestTime = moment.unix(change.ratingUpdateTimeSeconds);

            if (contestTime.isAfter(cutoffDate)) {
                contestCount++;
            } else {
                break; // Break the loop if contest time is one month ago
            }
        }
        return contestCount;
    } catch (error) {
        return error.message;
    }
}

export {
    getTotalProblemsSolvedLastMonthCF,
    getUserRatingCF,
    getTotalContestParticipationLastMonthCF,
};
