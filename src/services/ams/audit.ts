import apiClient from '../../config/axiosconfig';
import { Audit } from '../../types/audit';

export interface ApiResponse {
  // Define la estructura de la respuesta de la API si es necesario
  data: any;
  status: number;
  auditId?: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const auditService = {
  async fetchAllAudit(endpoint: string): Promise<ApiResponse> {
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
  async fetchAuditById(endpoint: string, id: string): Promise<ApiResponse> {
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
  async createAudit(
    endpoint: string,
    auditInput: number
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/${endpoint}`,
        auditInput,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      // Asegúrate de que la respuesta contiene el ID de la nueva auditoría
      const auditId = response.data.id;
      return {
        data: response.data,
        status: response.status,
        auditId: auditId, // Incluye el ID en el objeto de retorno
      };
    } catch (error) {
      throw new Error('Error al crear nuevas auditorías');
    }
  },
  async updateGroup(
    endpoint: string,
    id: string,
    afipAudit: Audit
  ): Promise<ApiResponse> {
    try {
      const response = await apiClient.put(
        `${API_BASE_URL}/${endpoint}/${id}`,
        afipAudit
      );
      return {
        data: response.data,
        status: response.status,
      };
    } catch (error) {
      throw new Error('Error al crear las auditorias');
    }
  },
  async deleteAudit(endpoint: string, id: number): Promise<ApiResponse> {
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

export { auditService };
