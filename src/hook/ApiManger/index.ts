import { GetCookie } from '@utils';

export class ApiManager {
  private apiUrl: string;

  constructor(_apiUrl: string) {
    this.apiUrl = _apiUrl;
  }

  getToken() {
    return GetCookie('accesstoken');
  }

  async getData<T>() {
    try {
      const response = await fetch(this.apiUrl);
      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição GET:', error);
      throw error;
    }
  }

  async postData<T>(dados: T) {
    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getToken()}`,
        },
        body: JSON.stringify(dados),
      });

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição POST:', error);
      throw error;
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

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição PUT:', error);
      throw error;
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

      const data: T = await response.json();
      return data;
    } catch (error) {
      console.error('Erro na requisição DELETE:', error);
      throw error;
    }
  }
}
