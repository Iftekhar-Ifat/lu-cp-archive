import axios from "axios";
export function cfHandleInput(handle) {
    axios
        .post("http://localhost:5000/send-cf-handle", { handle })
        .then((res) => console.log(res.data))
        .catch((err) => alert(err));
}
