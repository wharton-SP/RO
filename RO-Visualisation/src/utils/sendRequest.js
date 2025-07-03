import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api/";

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