import httpClient from "../http-commons.js";

const createSavingCapacity = (formData) => {
    return httpClient.post('/prestabanco/SavingCapacity/save', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}
const getSavingCapacity = (id) => {
    return httpClient.get(`/prestabanco/SavingCapacity/searchSavingCapacity/${id}`);
}

const updateSavingCapacity = (formData) => {
    return httpClient.put('/prestabanco/SavingCapacity/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
}

export default {
    getSavingCapacity,
    updateSavingCapacity,
    createSavingCapacity
}