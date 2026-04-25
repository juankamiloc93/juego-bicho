import axios from "axios";

const apiBaseUrl = 'http://localhost:8000/api';

const endPoint = 'login'

export const login = ({body}) => {
    return axios.post(`${apiBaseUrl}/${endPoint}`, body);
}