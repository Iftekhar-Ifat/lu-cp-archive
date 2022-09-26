import axios from "axios";
export async function cardsHandler(items, setShow) {
    axios
        .post(
            "https://lu-cp-archive-backend-production.up.railway.app/add-cards",
            {
                ...items,
            }
        )
        .then((res) => {
            if (res.data === "Error") {
                alert("⚠ Data Already Exists!!!");
                setShow(false);
            } else {
                alert("Data Added Successfully ✅");
                setShow(false);
            }
        })
        .catch((err) => alert(err));
}
