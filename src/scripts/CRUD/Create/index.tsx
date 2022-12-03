import { URL_API } from 'src/constant';

export function CreateItem(parameter: string, body: string[]) {
  try {
    fetch(`${URL_API}/${parameter}?secret=${process.env.SECRET_API}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
