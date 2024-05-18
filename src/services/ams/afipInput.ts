import axios from 'axios';
import {AfipInput} from "../../types/afipInput";
import {InputRequest} from "../../types/inputRequest";

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const afipInputService = {
    async fetchAllFeatures(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener las Auditorias');
        }
    },
    async fetchFeaturesById(endpoint: string, id : string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener las Auditorias por ID');
        }
    },
    async createFeatures(endpoint: string, afipInput: AfipInput): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, afipInput);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear nuevas auditorias');
        }
    },
    async updateAfipInput(endpoint: string, id : string, afipInputRequest: InputRequest): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, afipInputRequest);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear las auditorias');
        }
    },
    async deleteGroup(endpoint: string, id : string): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar las auditorias');
        }
    }
};

export {afipInputService}