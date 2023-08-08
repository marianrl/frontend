import axios from 'axios';
import {Answer} from "../../types/answer";

export interface ApiResponse {
    data: any;
    status: number;
}

const API_BASE_URL = 'http://localhost:8080/api/v1';

const answerService = {
    async fetchAllAnswer(endpoint: string): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de answer');
        }
    },

    async fetchAnswerById(endpoint: string, id: number): Promise<ApiResponse> {
        try {
            const response = await axios.get(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al obtener los datos de answer by Id');
        }
    },

    async createAnswer(endpoint: string, answer : Answer): Promise<ApiResponse> {
        try {
            const response = await axios.post(`${API_BASE_URL}/${endpoint}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al crear los datos de Answer');
        }
    },

    async updateAnswer(endpoint: string, id : number, answer : Answer): Promise<ApiResponse> {
        try {
            const response = await axios.put(`${API_BASE_URL}/${endpoint}/${id}`, answer);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al actualizar Answer');
        }
    },


    async deleteAnswer(endpoint: string, id : number): Promise<ApiResponse> {
        try {
            const response = await axios.delete(`${API_BASE_URL}/${endpoint}/${id}`);
            return {
                data: response.data,
                status: response.status,
            };
        } catch (error) {
            throw new Error('Error al eliminar Answer');
        }
    }

};

export {answerService}