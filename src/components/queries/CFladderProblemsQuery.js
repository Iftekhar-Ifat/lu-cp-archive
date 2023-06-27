import axios from 'axios';

async function getUserData(currentUserEmail) {
    const userDataAPI = 'https://chartreuse-green-dog-garb.cyclic.app/users';
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
    const cfProblemsAPI = `https://chartreuse-green-dog-garb.cyclic.app/codeforces-problems/${path.ladder}`;
    try {
        const result = await axios.get(cfProblemsAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserData, getCFproblemsData };
