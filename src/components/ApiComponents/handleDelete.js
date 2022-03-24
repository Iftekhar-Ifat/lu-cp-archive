import axios from "axios";
export function deleteHandler(itemUrl, setModalState) {
    axios
        .delete("http://localhost:5000/delete-data", { data: { url: itemUrl } })
        .then((response) => {
            alert("Problem Deleted Successfully ✅");
            setModalState(false);
        })
        .catch((err) => alert(err));
}
