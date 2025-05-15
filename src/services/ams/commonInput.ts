import apiClient from '../../config/axiosconfig';
import { CreateInputRequest } from '../../types/createInputRequest';
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
  async fetchCommonInputsByAuditId(
    endpoint: string,
    id: string
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
  async createCommonInputs(
    endpoint: string,
    commonInputs: CreateInputRequest[]
  ): Promise<ApiResponse> {
    try {
      console.log('Sending data to backend:', commonInputs);
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        commonInputs,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error in createCommonInputs:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
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
