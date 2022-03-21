export async function inputHandler(items, setBtnDisable) {
    fetch("/api/send-data", {
        method: "POST",
        body: JSON.stringify(items),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "Error") {
                alert("⚠ Data Already Exists!!!");
                setBtnDisable(false);
            } else {
                alert("Data Added Successfully ✅");
                setBtnDisable(false);
            }
        });
}
