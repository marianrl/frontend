import apiClient from '../../config/axiosconfig';

export interface ApiResponse {
  data: any;
  status: number;
}

const API_BASE_URL = process.env.REACT_APP_API_URL;

const cloudmersiveService = {
  async convertExcelToJson(file: File): Promise<ApiResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await apiClient.post(
        `${API_BASE_URL}/cloudmersive/convert-excel-to-json`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      return {
        data: response.data,
        status: response.status,
      };
    } catch (error: any) {
      console.error('Error in convertExcelToJson:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error response:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('Error request:', error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
      }
      throw error;
    }
  },
};

export { cloudmersiveService };
