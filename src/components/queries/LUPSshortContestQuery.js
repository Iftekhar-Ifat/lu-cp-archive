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

async function getLUPSshortContestData() {
    const lupsShortContestAPI = `${API}/lu-problemsolver-short-contest`;
    try {
        const result = await axios.get(lupsShortContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getLUPSshortContestData, getUserData };
