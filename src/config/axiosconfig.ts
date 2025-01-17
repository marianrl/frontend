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
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Configura un interceptor para manejar errores de respuesta
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Redirigir al login si el token es inválido o ha expirado
            console.error('No autorizado, redirigiendo al login...');
            localStorage.removeItem('authToken'); // Eliminar token si es inválido
            window.location.href = '/login'; // Ajusta la ruta según tu app
        }
        return Promise.reject(error);
    }
);

export default apiClient;
