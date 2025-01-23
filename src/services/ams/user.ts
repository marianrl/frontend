import apiClient from "../../config/axiosconfig";
import { User } from "../../types/user";
import { UserRequest } from "../../types/user_request";

export interface ApiResponse {
    // Define la estructura de la respuesta de la API si es necesario
    status: number;
    name: string;
    lastName: string;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const userService = {
    async fetchAllUser(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
            return {
                status: response.status,
                name: response.data.name,
                lastName: response.data.lastName
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de los Usuarios');
        }
    },

    async fetchUserById(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await apiClient.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                status: response.status,
                name: response.data.name,
                lastName: response.data.lastName
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de los Usuarios por ID');
        }
    },

    async fetchUserByMailAndPassword(endpoint: string, userRequest: UserRequest): Promise<number> {
        try {
            const response = await apiClient.post(endpoint, userRequest);
    
            // Almacenar el token en localStorage
            const token = response.data.token;
            if (token) {
                localStorage.setItem('authToken', `Bearer ${token}`);
                console.log('LOCAL STORAGE ' + localStorage.getItem('authToken'))
            }
    
            return response.status; // Devuelve solo el estado, ya que el token ya se almacenó
        } catch (error: any) {
            if (error.response && error.response.status === 401) {
                throw new Error('Usuario o contraseña incorrecta');
            }
            console.error("Error en fetchUserByMailAndPassword:", error);
            throw new Error('Error al procesar la solicitud');
        }
    },

    async createUser(endpoint: string, user: User): Promise<ApiResponse> {
        try {
            const response = await apiClient.post(`${API_BASE_URL}/${endpoint}`, user);
            return {
                status: response.status,
                name: response.data.name,
                lastName: response.data.lastName
            };
        } catch (error) {
            throw new Error('Error al crear los Usuarios');
        }
    },

    async updateUser(endpoint: string, id: number, user: User): Promise<ApiResponse> {
        try {
            const response = await apiClient.put(`${API_BASE_URL}/${endpoint}/${id}`, user);
            return {
                status: response.status,
                name: response.data.name,
                lastName: response.data.lastName
            };
        } catch (error) {
            throw new Error('Error al actualizar los datos de los Usuarios');
        }
    },

    async deleteUser(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await apiClient.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                status: response.status,
                name: response.data.name,
                lastName: response.data.lastName
            };
        } catch (error) {
            throw new Error('Error al eliminar los Usuarios');
        }
    }
};

export {userService}