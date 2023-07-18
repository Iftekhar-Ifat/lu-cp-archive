import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

export async function userInputHandler(users) {
    axios
        .post(`${API}/send-user`, {
            ...users,
        })
        .then()
        .catch(err => console.log(err));
}
