import axios from 'axios';

export default class Authentication {

    constructor() {
        this.state = {
            logged_in: false,
        };
    }

    isAuthenticated(callback) {
        return axios.get('/api/contacts')
        .then(response => {
            return true;
        })
        .catch(error => {
            return false;
        })
    }
}