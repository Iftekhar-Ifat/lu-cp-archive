import axios from 'axios';

async function getCardData() {
    const cardDataAPI = 'https://lu-cp-archive-backend.onrender.com/cards';
    try {
        const result = await axios.get(cardDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

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

export { getCardData, getUserData };
