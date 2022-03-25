import axios from "axios";
export async function userInputHandler(users) {
    axios
        .post("https://hidden-garden-59705.herokuapp.com/send-user", {
            ...users,
        })
        .then((res) => (res.statusText !== "OK" ? alert(res) : null))
        .catch((err) => alert(err));
}
