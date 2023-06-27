import axios from 'axios';
export function deleteHandler(itemUrl, setModalState) {
    axios
        .delete('https://chartreuse-green-dog-garb.cyclic.app/delete-data', {
            data: { url: itemUrl },
        })
        .then(res => {
            alert('Problem Deleted Successfully ✅');
            setModalState(false);
        })
        .catch(err => alert(err));
}
