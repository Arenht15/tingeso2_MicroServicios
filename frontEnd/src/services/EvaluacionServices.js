import httpClient from "../http-commons.js";

const evaluationCredit = (formData) => {
    return httpClient.put('/prestabanco/credit/EvaluarCredit', formData,
        {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
}

export default {
    evaluationCredit
}