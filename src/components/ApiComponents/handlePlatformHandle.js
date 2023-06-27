import axios from 'axios';
export async function platformHandleInput(handleInfo) {
    console.log(handleInfo);
    axios
        .post('https://chartreuse-green-dog-garb.cyclic.app/send-handle', {
            handleInfo,
        })
        .then(() =>
            alert(
                `${handleInfo.handle} handle successfully added! ✅. Reload to see the changes`
            )
        )
        .catch(err => alert(err));
}

// 'https://lu-cp-archive-backend.onrender.com'
