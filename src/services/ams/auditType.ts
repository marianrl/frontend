import apiClient from "../../config/axiosconfig";
import { AuditType } from '../../types/auditType';

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const auditTypeService = {
    async fetchAllAuditType(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los tipos de Auditorias');
        }
    },
    async fetchAuditTypesById(endpoint: string, id : number): Promise<ApiResponse> {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los tipos de Auditorias por ID');
        }
    },
    async createGroups(endpoint: string, auditTypes: AuditType): Promise<ApiResponse> {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/${endpoint}`, auditTypes);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear los tipos de Auditoria');
        }
    },
    async updateGroup(endpoint: string, id: number, auditTypes: AuditType): Promise<ApiResponse> {
        try {
            const response = await apiClient.put(`${API_BASE_URL}/${endpoint}/${id}`, auditTypes);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear los Groups');
        }
    },
    async deleteGroup(endpoint: string, id : number): Promise<ApiResponse> {
        try {
            const response = await apiClient.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar los Groups');
        }
    }
};

export {auditTypeService}