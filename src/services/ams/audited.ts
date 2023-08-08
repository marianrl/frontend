import axios from 'axios';
import {Audited} from "../../types/audited";

export interface ApiResponse {
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const auditedService = {
    async fetchAllAudited(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de audited');
        }
    },

    async fetchAuditedById(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de audited by Id');
        }
    },

    async createAudited(endpoint: string, audited : Audited): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear los datos de Audited');
        }
    },

    async updateAudited(endpoint: string, id : number, audited : Audited): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, audited);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al actualizar Audited');
        }
    },


    async deleteAudited(endpoint: string, id : number): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar Audited');
        }
    }

};

export {auditedService}