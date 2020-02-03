import axios from 'axios';

export async function getContacts(callback) {
    axios.get('/api/contacts')
    .then(response => {
        callback(response.data.data);
    })
    .catch(error => {
        callback({error: error});
    })
}