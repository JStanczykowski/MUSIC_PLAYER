import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:8080',
    headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Methods":"GET,PUT,POST",
        "withCredentials" :"false",
    },
});
export default instance;