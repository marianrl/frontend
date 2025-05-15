import apiClient from '../../config/axiosconfig';
import { Role } from '../../types/role';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  data: any;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const roleService = {
  async fetchAllRoles(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de los roles');
    }
  },
};

export { roleService };
