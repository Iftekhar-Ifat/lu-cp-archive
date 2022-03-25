import axios from "axios";
export async function userInputHandler(users) {
    axios
        .post("http://localhost:5000/send-user", { ...users })
        .then((res) => (res.statusText !== "OK" ? alert(res) : null))
        .catch((err) => alert(err));
}
