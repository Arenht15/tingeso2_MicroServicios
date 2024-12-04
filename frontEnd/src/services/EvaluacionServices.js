import httpClient from "../http-commons.js";

const evaluationSolicitud = (id) => {
    console.log("ID:", id);
    return httpClient.put(`/prestabanco/evaluacion/Evaluar/${id}`);
}

const updateStatus=(id)=>{
    return httpClient.put(`/prestabanco/evaluacion/pendiente/${id}`);
}

export default {
    evaluationSolicitud,
    updateStatus
}