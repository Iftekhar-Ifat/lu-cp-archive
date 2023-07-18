import axios from 'axios';
const API = import.meta.env.VITE_BACKEND_API;

export async function inputHandler(items, setShow) {
    axios
        .post(`${API}/send-data`, {
            ...items,
        })
        .then(res => {
            if (res.data === 'Error') {
                alert('⚠ Data Already Exists!!!');
                setShow(false);
            } else {
                alert('Data Added Successfully ✅');
                setShow(false);
            }
        })
        .catch(err => alert(err));
}
