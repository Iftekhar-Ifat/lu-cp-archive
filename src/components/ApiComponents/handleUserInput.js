import axios from 'axios';
export async function userInputHandler(users) {
    axios
        .post('https://chartreuse-green-dog-garb.cyclic.app/send-user', {
            ...users,
        })
        .then()
        .catch(err => console.log(err));
}
