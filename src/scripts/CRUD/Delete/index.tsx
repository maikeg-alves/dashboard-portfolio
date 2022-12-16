import { URL_API } from 'src/constant';

export async function DeleteItem(category: string, id: number) {
  try {
    if (window !== undefined) {
      await fetch(
        `${URL_API}/${category}?id=${id}&secret=${process.env.SECRET_API}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          /*  mode: 'cors', */
        },
      )
        .then((res) => res.text()) // or res.json()
        .then((res) => console.log(res));
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

/* export class CRUD {
  
  baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  // Create a new resource
  async create(resource: any) {
    const response = await fetch(this.baseUrl, {
      method: "POST",
      body: JSON.stringify(resource),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  // Read a resource by ID
  async read(id: string) {
    const response = await fetch(`${this.baseUrl}/${id}`);
    return await response.json();
  }

  // Update a resource by ID
  async update(id: string, resource: any) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "PUT",
      body: JSON.stringify(resource),
      headers: {
        "Content-Type": "application/json",
      },
    });
    return await response.json();
  }

  // Delete a resource by ID
  async delete(id: string) {
    const response = await fetch(`${this.baseUrl}/${id}`, {
      method: "DELETE",
    });
    return await response.json();
  }
} */
