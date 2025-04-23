import apiClient from '../../config/axiosconfig';
import { User } from '../../types/user';
import { UserMailRequest } from '../../types/user_mail_request';
import { UserRequest } from '../../types/user_request';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  status: number;
  data: User[];
  name: string;
  lastName: string;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const userService = {
  async fetchAllUser(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
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

  async fetchUserById(endpoint: string, id: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}/${id}`);
      return {
        data: response.data,
        status: response.status,
        name: response.data.name,
        lastName: response.data.lastName,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de los Usuarios por ID');
    }
  },

  async fetchUserByMailAndPassword(
    endpoint: string,
    userRequest: UserRequest
  ): Promise<number> {
    try {
      const response = await apiClient.post(endpoint, userRequest);

      // Almacenar el token en localStorage
      const token = response.data.token;
      if (token) {
        localStorage.setItem('authToken', `Bearer ${token}`);
        console.log('Token stored:', token);
        return response.status;
      }
      return 401; // If no token is received, treat as unauthorized
    } catch (error: any) {
      if (error.response) {
        return error.response.status;
      }
      return 500; // Return a generic error status
    }
  },

  async userExists(endpoint: string, mail: UserMailRequest): Promise<boolean> {
    try {
      const response = await apiClient.post(endpoint, mail);

      return response.data;
    } catch (error) {
      throw new Error('Error al buscar el Usuarios');
    }
  },

  async createUser(endpoint: string, user: User): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        user
      );
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
      const response = await apiClient.put(
        `${API_BASE_URL}/${endpoint}/${id}`,
        user
      );
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
      const response = await apiClient.delete(
        `${API_BASE_URL}/${endpoint}/${id}`
      );
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
