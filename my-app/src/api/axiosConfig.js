import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:8080',
    // headers: {
    //     "Access-Control-Allow-Origin" : "*",
    //     "Access-Control-Allow-Methods":"GET,OPTIONS,PATCH,DELETE,POST,PUT",
    //     "Access-Control-Allow-Headers":"X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization",
    //     "Access-Control-Allow-Credentials":"true"
    // },
});
export default instance;