import apiClient from '../../config/axiosconfig';

export interface ApiResponse {
  data: any;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const answerService = {
  async fetchAnswerByAuditType(
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
      throw new Error('Error al obtener los datos de answer by Id');
    }
  },
};

export { answerService };
