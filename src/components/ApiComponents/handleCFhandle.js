export async function cfHandleInput(handle) {
    fetch("/api/send-cf-handle", {
        method: "POST",
        body: JSON.stringify(handle),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}
