import apiClient from '../../config/axiosconfig';
import { User } from '../../types/user';
import { UserMailRequest } from '../../types/user_mail_request';
import { UserRequest } from '../../types/user_request';
import axios from 'axios';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  status: number;
  data: User[];
  name: string;
  lastName: string;
}

const API_BASE_URL = process.env.REACT_APP_API_URL;

const userService = {
  async fetchAllUser(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`/${endpoint}`);
      return {
        data: response.data,
        status: response.status,
        name: response.data.name,
        lastName: response.data.lastName,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de los Usuarios');
    }
  },

  async fetchUserByMailAndPassword(
    endpoint: string,
    userRequest: UserRequest
  ): Promise<number> {
    try {
      console.log('Attempting authentication with:', {
        url: `${API_BASE_URL}/${endpoint}`,
        payload: userRequest,
      });

      const response = await apiClient.post(`/${endpoint}`, userRequest);

      console.log('Authentication response:', response.data);

      // Almacenar el token en localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', `Bearer ${token}`);
        console.log('Token stored:', token);
        return response.status;
      }
      return 401; // If no token is received, treat as unauthorized
    } catch (error: any) {
      console.error('Authentication error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        requestData: userRequest,
        stackTrace: error.stack,
      });
      if (error.response) {
        return error.response.status;
      }
      return 500; // Return a generic error status
    }
  },

  async userExists(endpoint: string, mail: UserMailRequest): Promise<boolean> {
    try {
      const response = await apiClient.post(`/${endpoint}`, mail);
      return response.data;
    } catch (error) {
      throw new Error('Error al buscar el Usuarios');
    }
  },

  async createUser(endpoint: string, user: User): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(`/${endpoint}`, user);
      return {
        data: response.data,
        status: response.status,
        name: response.data.name,
        lastName: response.data.lastName,
      };
    } catch (error) {
      throw new Error('Error al crear los Usuarios');
    }
  },

  async updateUser(
    endpoint: string,
    id: number,
    user: User
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(`/${endpoint}/${id}`, user);
      return {
        data: response.data,
        status: response.status,
        name: response.data.name,
        lastName: response.data.lastName,
      };
    } catch (error) {
      throw new Error('Error al actualizar los datos de los Usuarios');
    }
  },

  async deleteUser(endpoint: string, id: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(`/${endpoint}/${id}`);
      return {
        data: response.data,
        status: response.status,
        name: response.data.name,
        lastName: response.data.lastName,
      };
    } catch (error) {
      throw new Error('Error al eliminar los Usuarios');
    }
  },
};

export { userService };
