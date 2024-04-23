import { AxiosInstance, AxiosResponse } from 'axios';
import instance from './axios';

class HttpClient {
  private client: AxiosInstance;

  constructor() {
    this.client = instance;
  }

  async get<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url);
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async post<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data);
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }

  async put<T>(url: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data);
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url);
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}

export default HttpClient;
