import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

async function getCardData() {
    const cardDataAPI = `${API}/cards`;
    try {
        const result = await axios.get(cardDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

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

export { getCardData, getUserData };
