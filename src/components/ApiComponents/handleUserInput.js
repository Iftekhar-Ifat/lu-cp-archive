export async function userInputHandler(users) {
    fetch("/api/send-user", {
        method: "POST",
        body: JSON.stringify(users),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => console.log(data));
}
