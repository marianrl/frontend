import apiClient from '../../config/axiosconfig';

export interface PdfGenerationRequest {
  url: string;
}

export interface PdfGenerationResponse {
  requestId: string;
  status: string;
  errorCode: string | null;
  errorMessage: string | null;
  documentUrl: string;
  expiresAt: string;
}

export interface ApiResponse {
  data: PdfGenerationResponse;
  status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const pdfService = {
  async generatePdf(url: string): Promise<ApiResponse> {
    try {
      const response = await apiClient.post(
        `${API_BASE_URL}/pdf/generate`,
        { url },
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
