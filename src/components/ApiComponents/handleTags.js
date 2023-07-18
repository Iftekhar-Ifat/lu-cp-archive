import axios from 'axios';

const API = import.meta.env.VITE_BACKEND_API;

export async function tagsHandler(items, setShow) {
    axios
        .post(`${API}/update-tags`, {
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
