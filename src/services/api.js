import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-production-0826.up.railway.app/api"
});

export default API;
