import apiClient from '../../config/axiosconfig';

export interface ApiResponse {
  data: any;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const ilovepdfService = {
  async convertHtmlToPdf(htmlContent: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/pdf/convert`,
        htmlContent,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          responseType: 'blob',
        }
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error in convertHtmlToPdf:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        console.error('Error request:', error.request);
      } else {
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },
};

export { ilovepdfService };
