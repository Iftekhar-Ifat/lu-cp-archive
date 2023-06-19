import axios from 'axios';

async function getProblemData(problemRoute) {
    const problemDataAPI = `https://lu-cp-archive-backend.onrender.com/topicProblems/${problemRoute.topicProblems}`;
    try {
        const result = await axios.get(problemDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getResourcesData(problemRoute) {
    const resourcesDataAPI = `https://lu-cp-archive-backend.onrender.com/resources/${problemRoute.topicProblems}`;
    try {
        const result = await axios.get(resourcesDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getTagsData() {
    const tagsDataAPI = `https://lu-cp-archive-backend.onrender.com/all-tags`;
    try {
        const result = await axios.get(tagsDataAPI);
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

export { getProblemData, getResourcesData, getUserData, getTagsData };
