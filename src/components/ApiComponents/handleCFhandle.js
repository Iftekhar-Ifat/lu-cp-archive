import axios from "axios";
export function cfHandleInput(handle) {
    axios
        .post("https://hidden-garden-59705.herokuapp.com/send-cf-handle", {
            handle,
        })
        .then((res) => console.log(res.data))
        .catch((err) => alert(err));
}
