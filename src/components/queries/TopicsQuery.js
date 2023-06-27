import axios from 'axios';

async function getCardData() {
    const cardDataAPI = 'https://chartreuse-green-dog-garb.cyclic.app/cards';
    try {
        const result = await axios.get(cardDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

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

export { getCardData, getUserData };
