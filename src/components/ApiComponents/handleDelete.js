export async function deleteHandler(itemUrl, setModalState) {
    fetch("/api/delete-data", {
        method: "DELETE",
        body: JSON.stringify(itemUrl),
        headers: {
            "Content-Type": "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.status === "Error") {
                alert("⚠ There is an Error!");
                setModalState(false);
            } else {
                alert("Problem Deleted Successfully ✅");
                setModalState(false);
            }
        });
}
