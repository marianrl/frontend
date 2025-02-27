import apiClient from '../../config/axiosconfig';
import { CommonInput } from '../../types/commonInput';
import { InputRequest } from '../../types/inputRequest';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  data: any;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const commonInputService = {
  async fetchAllCommonInput(endpoint: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener las Auditorias');
    }
  },
  async fetchCommonAuditById(
    endpoint: string,
    id: number
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.get(`${API_BASE_URL}/${endpoint}/${id}`);
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al obtener las Auditorias por ID');
    }
  },
  async createCommonAudit(
    endpoint: string,
    commonAudit: CommonInput
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        commonAudit
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear nuevas auditorias');
    }
  },
  async updateCommonInput(
    endpoint: string,
    id: string,
    commonInputRequest: InputRequest
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}/${endpoint}/${id}`,
        commonInputRequest
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear las auditorias');
    }
  },
  async deleteCommonInput(endpoint: string, id: number): Promise<ApiResponse> {
    try {
      const response = await apiClient.delete(
        `${API_BASE_URL}/${endpoint}/${id}`
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al eliminar las auditorias');
    }
  },
};

export { commonInputService };
