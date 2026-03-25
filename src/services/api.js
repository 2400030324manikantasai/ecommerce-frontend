import axios from "axios";

const API = axios.create({
  baseURL: "https://ecommerce-backend-production-d64c.up.railway.app/api"
});

export default API;
