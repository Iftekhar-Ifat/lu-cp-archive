import axios from 'axios';

const codeforcesContestAPI = 'https://kontests.net/api/v1/codeforces';
const codechefContestAPI = 'https://kontests.net/api/v1/code_chef';
const atcoderContestAPI = 'https://kontests.net/api/v1/at_coder';

async function fetchContestData() {
    try {
        const [codeforcesResponse, codechefResponse, atcoderResponse] =
            await axios.all([
                axios.get(codeforcesContestAPI),
                axios.get(codechefContestAPI),
                axios.get(atcoderContestAPI),
            ]);

        let allContestData = [];

        codeforcesResponse.data.forEach(contest => {
            contest['platform'] = 'Codeforces';
            allContestData.push(contest);
        });

        codechefResponse.data.forEach(contest => {
            contest['platform'] = 'Codechef';
            allContestData.push(contest);
        });

        atcoderResponse.data.forEach(contest => {
            contest['platform'] = 'Atcoder';
            allContestData.push(contest);
        });

        allContestData.sort(
            (a, b) =>
                new Date(a.start_time).getTime() -
                new Date(b.start_time).getTime()
        );

        return allContestData;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export default fetchContestData;
