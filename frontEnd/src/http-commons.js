import axios from "axios";

const pretabancoBackendServer = import.meta.env.VITE_PRESTABANCO_BACKEND_SERVER;
const prestabancoBackendPort = import.meta.env.VITE_PRESTABANCO_BACKEND_PORT;

export default axios.create({
    baseURL: `http://${pretabancoBackendServer}:${prestabancoBackendPort}`,
    headers: {
        'Content-Type': 'application/json'
    }
});