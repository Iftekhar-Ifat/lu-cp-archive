import axios from "axios";
export async function cfHandleInput(handle) {
    const userCFhandle = handle.cfHandle;
    axios
        .post(
            "https://lu-cp-archive-backend-production.up.railway.app/send-cf-handle",
            {
                handle,
            }
        )
        .then(
            (res) =>
                alert(
                    `${userCFhandle} handle successfully added! ✅. Reload to see the changes`
                ),
            localStorage.setItem("cf-handle", userCFhandle)
        )
        .catch((err) => alert(err));
}
