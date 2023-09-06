import axios from 'axios';
import { User } from "../../types/user";
import { UserRequest } from "../../types/user_request";

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const userService = {
    async fetchAllUser(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return {
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de los Usuarios');
        }
    },

    async fetchUserById(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de los Usuarios por ID');
        }
    },

    async fetchUserByMailAndPassword(endpoint: string, userRequest: UserRequest): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, userRequest);
            return {
                status: response.status,
            };
        } catch (error) {
            throw new Error('Usuario o contraseña incorrecta');
        }
    },

    async createUser(endpoint: string, user: User): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`, user);
            return {
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear los Usuarios');
        }
    },

    async updateUser(endpoint: string, id: number, user: User): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, user);
            return {
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al actualizar los datos de los Usuarios');
        }
    },

    async deleteUser(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar los Usuarios');
        }
    }
};

export {userService}