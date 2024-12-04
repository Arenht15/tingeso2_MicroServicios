import httpClient from "../http-commons.js";

const buscarSolicitudes = (id) => {
    return httpClient.get(`/prestabanco/seguimiento/listSolicitudUser/${id}`);
}

const calcularCostos = (id) => {
    return httpClient.get(`/prestabanco/seguimiento/CalcularCosto/${id}`);
}

export default {
    buscarSolicitudes,
    calcularCostos
}