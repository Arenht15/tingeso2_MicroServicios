import httpClient from "../http-commons.js";

const createCredit = (formData) => {
    return httpClient.post('/prestabanco/solicitud/save', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const updateCredit = (formData) => {
    return httpClient.put('/prestabanco/solicitud/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

const actualizarevaluacion = (formData) => {
    return httpClient.put('/prestabanco/solicitud/actualizarCredito', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}


const getAll = () => {
    return httpClient.get('/prestabanco/solicitud/getSolicitudes');
}

const getCredit = (id) => {
    return httpClient.get(`/prestabanco/solicitud/getSol/${id}`);
}

const searchCreditbyIdUser = (id) => {
    return httpClient.get(`/prestabanco/solicitud/getCreditByUserId/${id}`);
}

export default {
    createCredit,
    updateCredit,
    getAll,
    getCredit,
    searchCreditbyIdUser,
    actualizarevaluacion
}