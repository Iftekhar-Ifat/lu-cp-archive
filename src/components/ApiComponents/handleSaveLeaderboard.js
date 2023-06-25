import axios from 'axios';
export async function leaderboardSave(leaderboardInfo) {
    axios
        .post('http://localhost:5000/send-leaderboard', leaderboardInfo)
        .then(
            response => console.log(response),
            alert(
                'Leaderboard successfully updated! ✅. Reload to see the changes'
            )
        )
        .catch(err => alert(err));
}
