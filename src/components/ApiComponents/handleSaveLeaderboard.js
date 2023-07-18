import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

export async function leaderboardSave(leaderboardInfo) {
    axios
        .post(`${API}/send-leaderboard`, leaderboardInfo)
        .then(response => {
            if (response.status === 200) {
                alert(
                    'Leaderboard successfully updated! ✅. Reload to see the changes'
                );
            } else {
                alert('Something went wrong❗❗❗ Try again');
            }
        })
        .catch(err => alert(err));
}
