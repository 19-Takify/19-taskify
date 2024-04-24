import { AxiosInstance, AxiosResponse } from 'axios';

class HttpClient {
  private client: AxiosInstance;

  constructor(client: AxiosInstance) {
    this.client = client;
  }

  async get<T>(url: string, header = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.get(url, {
        headers: {
          ...header,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  async post<T>(url: string, data: T, header = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.post(url, data, {
        headers: {
          ...header,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error posting data:', error);
      throw error;
    }
  }

  async put<T>(url: string, data: T, header = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.put(url, data, {
        headers: {
          ...header,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }

  async delete<T>(url: string, header = {}): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.client.delete(url, {
        headers: {
          ...header,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}

export default HttpClient;
