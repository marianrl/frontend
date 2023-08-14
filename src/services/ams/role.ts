import axios from 'axios';
import { Role } from "../../types/role";

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const roleService = {
    async fetchAllRoles(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de los roles');
        }
    },

    async fetchRoleById(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de los roles por ID');
        }
    },

    async createRole(endpoint: string, role: Role): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, role);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear los roles');
        }
    },

    async updateRole(endpoint: string, id: number, role: Role): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, role);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al actualizar los datos de los roles');
        }
    },

    async deleteRole(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar los roles');
        }
    }
};

export {roleService}