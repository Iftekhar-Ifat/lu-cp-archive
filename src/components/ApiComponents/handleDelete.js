import axios from "axios";
export function deleteHandler(itemUrl, setModalState) {
    axios
        .delete("https://lu-cp-archive-backend.onrender.com/delete-data", {
            data: { url: itemUrl },
        })
        .then((res) => {
            alert("Problem Deleted Successfully ✅");
            setModalState(false);
        })
        .catch((err) => alert(err));
}
