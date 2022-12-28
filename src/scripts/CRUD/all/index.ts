import { PUTProject, ITechnologysCRUD } from '@interfaces';

export class _CRUD {
  static baseUrl = 'https://maicon-gabriel-alves.vercel.app/api';
  readonly id: number;
  readonly category: string;

  constructor(id: number, category: string) {
    this.id = id;
    this.category = category; //projects || technologys
  }

  // Create a new resource ?secret=
  async create(resource: PUTProject | ITechnologysCRUD) {
    const response = await fetch(
      `${_CRUD.baseUrl}/${this.category}?secret=${process.env.SECRET_API}`,
      {
        method: 'POST',
        body: JSON.stringify(resource),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return await response.json();
  }

  // Update a resource by ID
  async update(resource: PUTProject | ITechnologysCRUD) {
    const response = await fetch(
      `${_CRUD.baseUrl}/${this.category}?id=${this.id}&secret=${process.env.SECRET_API}`,
      {
        method: 'PATCH',
        body: JSON.stringify(resource),
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    return await response.json();
  }

  // Delete a resource by ID
  async delete() {
    const response = await fetch(
      `${_CRUD.baseUrl}/${this.category}?id=${this.id}&secret=${process.env.SECRET_API}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      },
    );

    return await response.json();
  }
}
