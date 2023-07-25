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

async function getCFInfo(cfHandle) {
    const cfInfoAPI = `https://codeforces.com/api/user.info?handles=${cfHandle}`;
    try {
        const result = await axios.get(cfInfoAPI);
        return result.data.result[0];
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getCFInfo, getUserData };
