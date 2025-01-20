import axios from "axios";

const request = axios.create({
    baseURL: "http://localhost:9000/api"
});

export default request