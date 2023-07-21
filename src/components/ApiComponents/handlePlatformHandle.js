import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

export async function platformHandleInput(handleInfo) {
    axios
        .post(`${API}/send-handle`, {
            handleInfo,
        })
        .then(() =>
            alert(
                `${handleInfo.handle} handle successfully added! ✅. Reload to see the changes`
            )
        )
        .catch(err => alert(err));
}

// 'https://lu-cp-archive-VITE_BACKEND.onrender.com'
