import axios from 'axios';

async function getUserCFData(currentUserEmail) {
    const userDataAPI = 'https://lu-cp-archive-backend.onrender.com/users';
    try {
        let userObject;
        await axios
            .get(userDataAPI, {
                params: { currentUserEmail: currentUserEmail },
            })
            .then(result => {
                let cfHandle;
                result.data.handles.forEach(item => {
                    if (item.platform === 'codeforces') {
                        cfHandle = item.handle;
                    }
                });
                userObject = {
                    userRole: result.data.role,
                    userHandle: cfHandle,
                };
            });

        return userObject;
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

async function getCFInfo(cfHandle) {
    const cfInfoAPI = `https://codeforces.com/api/user.info?handles=${cfHandle}`;
    try {
        const result = await axios.get(cfInfoAPI);
        return result.data.result[0];
    } catch (error) {
        console.error('Error:', error.message);
        throw error;
    }
}

export { getUserCFData, getCFInfo };
