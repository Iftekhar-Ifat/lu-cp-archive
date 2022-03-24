import axios from "axios";
export async function inputHandler(items, setBtnDisable) {
    axios
        .post("http://localhost:5000/send-data", { ...items })
        .then((res) => {
            console.log(res);
            if (res.data === "Error") {
                alert("⚠ Data Already Exists!!!");
                setBtnDisable(false);
            } else {
                alert("Data Added Successfully ✅");
                setBtnDisable(false);
            }
        })
        .catch((err) => alert(err));
}
