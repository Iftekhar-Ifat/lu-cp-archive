import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

export function deleteHandler(itemUrl, setModalState) {
    axios
        .delete(`${API}/delete-data`, {
            data: { url: itemUrl },
        })
        .then(res => {
            alert('Problem Deleted Successfully ✅');
            setModalState(false);
        })
        .catch(err => alert(err));
}
