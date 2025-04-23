import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/v1';

// Crea una instancia de Axios con configuración inicial
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Configura el interceptor para incluir el token en las solicitudes
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Obtén el token almacenado
    if (token) {
      config.headers['Authorization'] = token;
      console.log('AXIOSCONFIG ' + config.headers['Authorization']);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Configura un interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
  (response) => response, // Si la respuesta es exitosa, simplemente devuélvela
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status === 401) {
        // Solo eliminar el token si existe, pero no redirigir automáticamente
        localStorage.removeItem('authToken');
      } else if (status === 403) {
        // Solo redirigir si es un error de autenticación, no de permisos
        if (error.response.data?.message?.includes('JWT')) {
          console.error('Token inválido, redirigiendo al login...');
          localStorage.removeItem('authToken');
          window.location.href = '/login';
        } else {
          // Si es un error de permisos, solo mostrar el error
          console.error('Acceso denegado:', error.response.data);
        }
      }
    } else {
      // Manejo de errores de red o configuración
      console.error('Error de red o configuración:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
