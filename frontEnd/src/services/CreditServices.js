import httpClient from "../http-commons.js";

const simulateCredit = (type, amount, term, rate) => {
    return httpClient.get(`/prestabanco/user/simulateCredit/${type}/${amount}/${term}/${rate}`);
}

const updateStatus=(id)=>{
    return httpClient.put(`/prestabanco/credit/updateStatus/${id}`);
}


export default {
    updateStatus,
    simulateCredit
};