import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

export async function handleAddAdmin(email, addAdmin) {
    axios
        .post(`${API}/add-admin`, {
            email,
            addAdmin,
        })
        .then(response => alert(response.data.message))
        .catch(err => alert(err));
}

// 'https://lu-cp-archive-VITE_BACKEND.onrender.com'
