import axios from 'axios';
export async function leaderboardSave(leaderboardInfo) {
    axios
        .post('http://localhost:5000/send-leaderboard', leaderboardInfo)
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