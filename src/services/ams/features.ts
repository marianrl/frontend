import apiClient from '../../config/axiosconfig';
import { Features } from '../../types/features';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  data: any;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const featureService = {
  async fetchAllFeatures(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de features');
    }
  },
  async fetchFeaturesById(endpoint: string, id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener los datos de features por ID');
    }
  },
  async createFeatures(
    endpoint: string,
    feature: Features
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        feature
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear los Features');
    }
  },
  async updateGroup(
    endpoint: string,
    id: string,
    feature: Features
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}/${endpoint}/${id}`,
        feature
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear los Features');
    }
  },
  async deleteGroup(endpoint: string, id: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_BASE_URL}/${endpoint}/${id}`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al eliminar los Features');
    }
  },
};

export { featureService };
