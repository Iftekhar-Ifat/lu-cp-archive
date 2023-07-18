import axios from 'axios';

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

async function getLUPSmarathonContestData() {
    const lupsMarathonContestAPI = `${API}/lu-problemsolver-marathon-contest`;
    try {
        const result = await axios.get(lupsMarathonContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getLUPSmarathonContestData, getUserData };
