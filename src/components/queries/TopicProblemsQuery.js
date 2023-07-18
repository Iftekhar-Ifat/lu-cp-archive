import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

async function getProblemData(problemRoute) {
    const problemDataAPI = `${API}/topicProblems/${problemRoute.topicProblems}`;
    try {
        const result = await axios.get(problemDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getResourcesData(problemRoute) {
    const resourcesDataAPI = `${API}/resources/${problemRoute.topicProblems}`;
    try {
        const result = await axios.get(resourcesDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getTagsData() {
    const tagsDataAPI = `${API}/all-tags`;
    try {
        const result = await axios.get(tagsDataAPI);
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

export { getProblemData, getResourcesData, getTagsData, getUserData };
