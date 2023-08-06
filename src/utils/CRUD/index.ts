import { PUTProject, ITechnologysCRUD, Ilogin } from '@interfaces';
import { baseUrl } from '@utils';

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
    const response = await fetch(`${ApiClient.baseUrl}/api/${this.category}`, {
      method: 'POST',
      body: JSON.stringify(resource),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      return { code: response.status, data: resource };
    }

    return await response.json();
  }

  // Update a resource by ID
  async update(resource: PUTProject | ITechnologysCRUD, token: string) {
    const response = await fetch(
      `${ApiClient.baseUrl}/${this.category}${`?id=${this.id}`}`,
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
      return { code: response.status };
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
    const response = await fetch(`${baseUrl}/api/login`, {
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

    const json = await response.json();

    return response
      ? {
          response: json,
          code: response.status,
        }
      : null;
  }

  /*   async recovery(email: string) {
    const response = await fetch(`${baseUrl}/api/login/recovery`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });

    if (response.status !== 200) {
      return {
        code: response.status,
      };
    }

    return {
      code: response.status,
    };
  } */

  /* async recoveryCode(email: string, code: number) {
    try {
      const response = await fetch(`${baseUrl}/api/login/recovery`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ email, code }),
      });

      if (!response.ok) {
        return {
          error: `Error during recovery code retrieval: status code ${response.status}`,
          code: response.status,
        };
      }

      const json = await response.json();

      return {
        code: json.code,
        tokenrecovery: json.recoveryToken,
      };
    } catch (error) {
      return { error: 'An error occurred while processing the request.' };
    }
  } */
}
