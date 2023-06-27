import axios from 'axios';

async function getProblemData(problemRoute) {
    const problemDataAPI = `https://chartreuse-green-dog-garb.cyclic.app/topicProblems/${problemRoute.topicProblems}`;
    try {
        const result = await axios.get(problemDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getResourcesData(problemRoute) {
    const resourcesDataAPI = `https://chartreuse-green-dog-garb.cyclic.app/resources/${problemRoute.topicProblems}`;
    try {
        const result = await axios.get(resourcesDataAPI);
        return result.data;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getTagsData() {
    const tagsDataAPI = `https://chartreuse-green-dog-garb.cyclic.app/all-tags`;
    try {
        const result = await axios.get(tagsDataAPI);
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

export { getProblemData, getResourcesData, getUserData, getTagsData };
