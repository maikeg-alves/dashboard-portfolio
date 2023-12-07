import { GetCookie } from '@utils';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    statusCode: number;
    message: string;
  };
}

export class ApiManager {
  private apiUrl: string;

  constructor(_apiUrl: string) {
    this.apiUrl = _apiUrl;
  }

  private getToken() {
    return GetCookie('accesstoken');
  }

  private handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    if (response.ok) {
      return response.json().then((data) => ({ success: true, data }));
    }
    return response.json().then((error) => ({
      success: false,
      error: {
        statusCode: response.status,
        message: error.message || 'Unknown error',
      },
    }));
  }

  async getData<T>(): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.apiUrl);
      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('Erro na requisição GET:', error);
      return {
        success: false,
        error: { statusCode: 500, message: 'Internal server error' },
      };
    }
  }

  async postData<T>(dados: T): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify(dados),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      return {
        success: false,
        error: { statusCode: 500, message: 'Internal server error' },
      };
    }
  }

  async putData<T>(dados: T) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify(dados),
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('Erro na requisição PUT:', error);
      return {
        success: false,
        error: { statusCode: 500, message: 'Internal server error' },
      };
    }
  }
  async deleteData<T>() {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        },
      });

      return this.handleResponse<T>(response);
    } catch (error) {
      console.error('Erro na requisição DELETE:', error);
      return {
        success: false,
        error: { statusCode: 500, message: 'Internal server error' },
      };
    }
  }
}
