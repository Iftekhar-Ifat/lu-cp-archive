import axios from 'axios';

async function getUserData(currentUserEmail) {
    const userDataAPI = '{import.meta.env.VITE_BACKEND_API}/users';
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
        '{import.meta.env.VITE_BACKEND_API}/intra-lu-contest';
    try {
        const result = await axios.get(intraLUContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getIntraLUContestData, getUserData };
