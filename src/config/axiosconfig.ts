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
        // Redirigir al login si el token es inválido o ha expirado
        console.error('No autorizado, redirigiendo al login...');
        localStorage.removeItem('authToken'); // Eliminar el token almacenado
        window.location.href = '/login'; // Redirigir a la página de login
      } else if (status === 403) {
        // Opcional: manejar el caso en que el usuario no tenga permisos
        console.error('Acceso denegado.');
        window.location.href = '/login'; // Redirigir a la página de login
      }
    } else {
      // Manejo de errores de red o configuración
      console.error('Error de red o configuración:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
