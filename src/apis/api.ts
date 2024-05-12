import axios from "axios";
const baseUrl = "https://memomind-server.onrender.com";

const Api = axios.create({ baseURL: baseUrl, withCredentials: true });

export default Api;
