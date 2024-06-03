import axios from "axios";

const api = axios.create({
  baseURL: "https://projetofinal-api-jpgc.onrender.com/api",
});

export default api;
