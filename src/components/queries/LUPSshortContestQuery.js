import axios from 'axios';

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

async function getLUPSshortContestData() {
    const lupsShortContestAPI =
        'https://lu-cp-archive-backend.onrender.com/lu-problemsolver-short-contest';
    try {
        const result = await axios.get(lupsShortContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserData, getLUPSshortContestData };
