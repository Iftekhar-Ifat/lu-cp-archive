import axios from "axios";
export async function inputHandler(items, setShow) {
    axios
        .post("https://lu-cp-archive-backend.onrender.com/send-data", {
            ...items,
        })
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
