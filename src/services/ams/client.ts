import axios from 'axios';
import { Client } from "../../types/client";

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const clientService = {
    async fetchAllClients(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de clients');
        }
    },

    async fetchClientById(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de clients por ID');
        }
    },

    async createClient(endpoint: string, client: Client): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, client);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear el client');
        }
    },

    async updateClient(endpoint: string, id: number, client: Client): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, client);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al actualizar los datos del client');
        }
    },

    async deleteClient(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar el client');
        }
    }
};

export {clientService}