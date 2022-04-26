import axios from "axios";
export async function cardsHandler(items, setShow) {
    axios
        .post("https://hidden-garden-59705.herokuapp.com/add-cards", {
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

//
