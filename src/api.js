import axios from "axios";

const api = axios.create({
    baseURL: "https://vove-aplication-1686536532334.azurewebsites.net"  // URL base para realizar as requisições
})

//    "http://localhost:8080"
export default api; 