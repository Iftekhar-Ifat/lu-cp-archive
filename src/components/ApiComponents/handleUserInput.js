import axios from "axios";
export async function userInputHandler(users) {
    axios
        .post("https://lu-cp-archive-backend.onrender.com/send-user", {
            ...users,
        })
        .then()
        .catch((err) => console.log(err));
}
