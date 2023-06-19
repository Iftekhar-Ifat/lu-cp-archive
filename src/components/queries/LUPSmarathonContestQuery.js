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

async function getLUPSmarathonContestData() {
    const lupsMarathonContestAPI =
        'https://lu-cp-archive-backend.onrender.com/lu-problemsolver-marathon-contest';
    try {
        const result = await axios.get(lupsMarathonContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserData, getLUPSmarathonContestData };
