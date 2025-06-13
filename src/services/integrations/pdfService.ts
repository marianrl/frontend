import apiClient from '../../config/axiosconfig';
import { PageData, ApiResponse } from '../../types/pdf';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const pdfService = {
  async generatePdf(pageData: PageData): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/pdf/generate`,
        { pageData },
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
      console.error('Error in generatePdf:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
      }
      throw new Error('Error al generar el PDF');
    }
  },
};

export { pdfService };
