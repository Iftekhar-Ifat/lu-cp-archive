import axios from "axios";
export async function inputHandler(items, setShow) {
    axios
        .post("https://hidden-garden-59705.herokuapp.com/send-data", {
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
