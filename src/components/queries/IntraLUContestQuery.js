import axios from 'axios';

async function getUserData(currentUserEmail) {
    const userDataAPI = 'https://chartreuse-green-dog-garb.cyclic.app/users';
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

async function getIntraLUContestData() {
    const intraLUContestAPI =
        'https://chartreuse-green-dog-garb.cyclic.app/intra-lu-contest';
    try {
        const result = await axios.get(intraLUContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserData, getIntraLUContestData };
