import httpClient from "../http-commons.js";

const simulateCredit = (type, amount, term, rate) => {
    return httpClient.get(`/prestabanco/credito/simulation/${type}/${amount}/${term}/${rate}`);
}


export default {
    simulateCredit
};