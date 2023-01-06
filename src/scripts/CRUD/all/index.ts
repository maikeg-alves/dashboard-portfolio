import { PUTProject, ITechnologysCRUD, Ilogin } from '@interfaces';

export class ApiClient {
  static baseUrl = 'https://maicon-gabriel-alves.vercel.app/api';
  readonly id?: number;
  readonly category: string;

  constructor(id: number, category: string) {
    this.id = id;
    this.category = category; //projects || technologys
  }

  // Create a new resource
  async create(resource: PUTProject | ITechnologysCRUD, token: string) {
    const response = await fetch(`${ApiClient.baseUrl}/${this.category}`, {
      method: 'POST',
      body: JSON.stringify(resource),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return {
        error: `Erro ao fazer mudança: código de status ${response.status}`,
        code: response.status,
      };
    }

    return response ? await response.json() : null;
  }

  // Update a resource by ID
  async update(resource: PUTProject | ITechnologysCRUD, token: string) {
    const response = await fetch(
      `${ApiClient.baseUrl}/${this.category}${this.id ? `?id=${this.id}` : ''}`,
      {
        method: 'PUT',
        body: JSON.stringify(resource),
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) {
      return {
        error: `Erro ao fazer mudança: código de status ${response.status}`,
        code: response.status,
      };
    }

    return response ? await response.json() : null;
  }

  // Delete a resource by ID
  async delete(token: string) {
    const response = await fetch(
      `${ApiClient.baseUrl}/${this.category}${this.id ? `?id=${this.id}` : ''}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) {
      return {
        error: `Erro ao fazer mudança: código de status ${response.status}`,
        code: response.status,
      };
    }

    return response ? await response.json() : null;
  }

  async login(resource: Ilogin) {
    const response = await fetch(`${ApiClient.baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(resource),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.status !== 200) {
      return {
        error: `Erro ao fazer login: código de status ${response.status}`,
        code: response.status,
      };
    }

    return response ? await response.json() : null;
  }
}
