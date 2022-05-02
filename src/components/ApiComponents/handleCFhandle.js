import axios from "axios";
export async function cfHandleInput(handle) {
    const userCFhandle = handle.cfHandle;
    axios
        .post("https://hidden-garden-59705.herokuapp.com/send-cf-handle", {
            handle,
        })
        .then(
            (res) =>
                alert(
                    `${userCFhandle} handle successfully added! ✅. Reload to see the changes`
                ),
            localStorage.setItem("cf-handle", userCFhandle)
        )
        .catch((err) => alert(err));
}
