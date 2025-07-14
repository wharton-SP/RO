import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:4321/api/";

const sendRequest = async (url, method, data) => {
    try {
        const response = await axios({
            url: API_BASE_URL + url,
            method,
            data,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error sending request:", error);
        throw error;
    }
};

export default sendRequest;