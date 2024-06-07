import axios from "axios";

// Create an instance of Axios with the base URL 
const instance = axios.create({
  baseURL: "https://car-inventory-api.vercel.app",
});

export default instance;
