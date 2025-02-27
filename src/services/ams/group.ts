import apiClient from '../../config/axiosconfig';
import { Group } from '../../types/group';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  data: any;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const groupService = {
  async fetchAllGroups(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de groups');
    }
  },
  async fetchGroupsById(endpoint: string, id: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de groups por ID');
    }
  },
  async createGroups(endpoint: string, group: Group): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        group
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear los Groups');
    }
  },
  async updateGroup(
    endpoint: string,
    id: number,
    group: Group
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}/${endpoint}/${id}`,
        group
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear los Groups');
    }
  },
  async deleteGroup(endpoint: string, id: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_BASE_URL}/${endpoint}/${id}`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al eliminar los Groups');
    }
  },
};

export { groupService };
