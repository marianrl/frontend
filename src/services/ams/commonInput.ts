import axios from 'axios';
import {CommonInput} from "../../types/commonInput";
import {InputRequest} from "../../types/inputRequest";


export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const commonInputService = {
    async fetchAllCommonInput(endpoint: string): Promise<ApiResponse> {
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
    async fetchCommonAuditById(endpoint: string, id: number): Promise<ApiResponse> {
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
    async createCommonAudit(endpoint: string, commonAudit: CommonInput): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, commonAudit);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear nuevas auditorias');
        }
    },
    async updateCommonInput(endpoint: string, id : string, commonInputRequest: InputRequest): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, commonInputRequest);
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

export {commonInputService}