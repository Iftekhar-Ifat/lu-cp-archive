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

async function getCFproblemsData(path) {
    const cfProblemsAPI = `https://lu-cp-archive-backend.onrender.com/codeforces-problems/${path.ladder}`;
    try {
        const result = await axios.get(cfProblemsAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserData, getCFproblemsData };