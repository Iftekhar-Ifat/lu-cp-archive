import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

async function getUserData(currentUserEmail) {
    const userDataAPI = `${API}/users`;
    try {
        const result = await axios.get(userDataAPI, {
            params: { currentUserEmail: currentUserEmail },
        });
        let cfHandle;
        result.data.handles.forEach(item => {
            if (item.platform === 'codeforces') {
                cfHandle = item.handle;
            }
        });
        const userObject = {
            userRole: result.data.role,
            userHandle: cfHandle,
        };
        return userObject;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getCFproblemsData(path) {
    const cfProblemsAPI = `${API}/codeforces-problems/${path.ladder}`;
    try {
        const result = await axios.get(cfProblemsAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getCFproblemsData, getUserData };
