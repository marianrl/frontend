import axios from 'axios';
import {Audit} from "../../types/audit";

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const auditService = {
    async fetchAllAudit(endpoint: string): Promise<ApiResponse> {
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
    async fetchAuditById(endpoint: string, id : string): Promise<ApiResponse> {
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
    async createAudit(endpoint: string, auditInput: number): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, auditInput, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear nuevas auditorías');
        }
    },
    async updateGroup(endpoint: string, id : string, afipAudit: Audit): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, afipAudit);
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

export {auditService}