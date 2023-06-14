import axios from "axios";

const api = axios.create({
    baseURL: "http://20.124.249.169:8080"  // URL base para realizar as requisições
})

//    "http://localhost:8080"
export default api; 