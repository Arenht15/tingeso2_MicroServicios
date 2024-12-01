import httpClient from "../http-commons.js";


    const save = (formData) => {
        return httpClient.post('/prestabanco/user/save', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    }

    const validUser = (rut) => {
        return httpClient.get("/prestabanco/user/SearchUser", { params: { rut } });
    }



export default {
    save,
    validUser
};

