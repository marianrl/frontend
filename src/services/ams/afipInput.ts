import apiClient from '../../config/axiosconfig';
import { CreateInputRequest } from '../../types/createInputRequest';
import { InputRequest } from '../../types/inputRequest';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  data: any;
  status: number;
}

const API_BASE_URL = process.env.REACT_APP_API_URL;

const afipInputService = {
  async fetchAfipInputsByAuditId(
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
  async createAfipInputs(
    endpoint: string,
    afipInputs: CreateInputRequest[]
  ): Promise<ApiResponse> {
    try {
      console.log('Sending data to backend:', afipInputs);
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        afipInputs,
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
      console.error('Error in createAfipInputs:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      }
      throw new Error('Error al crear nuevas auditorias');
    }
  },
  async updateAfipInput(
    endpoint: string,
    id: string,
    afipInputRequest: InputRequest
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}/${endpoint}/${id}`,
        afipInputRequest
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear las auditorias');
    }
  },
  async deleteAfipInput(endpoint: string, id: number): Promise<ApiResponse> {
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

export { afipInputService };
