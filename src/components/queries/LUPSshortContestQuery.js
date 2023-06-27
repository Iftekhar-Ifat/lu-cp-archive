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

async function getLUPSshortContestData() {
    const lupsShortContestAPI =
        'https://chartreuse-green-dog-garb.cyclic.app/lu-problemsolver-short-contest';
    try {
        const result = await axios.get(lupsShortContestAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserData, getLUPSshortContestData };
