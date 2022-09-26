import axios from "axios";
export async function tagsHandler(items, setShow) {
    axios
        .post(
            "https://lu-cp-archive-backend-production.up.railway.app/update-tags",
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
