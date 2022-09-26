import axios from "axios";
export async function userInputHandler(users) {
    axios
        .post(
            "https://lu-cp-archive-backend-production.up.railway.app/send-user",
            {
                ...users,
            }
        )
        .then((res) => (res.statusText !== "OK" ? alert(res) : null))
        .catch((err) => alert(err));
}
