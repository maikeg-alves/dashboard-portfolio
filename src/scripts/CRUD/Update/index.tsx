import { URL_API } from 'src/constant';

export function PutItem(parameter: string, id: number) {
  try {
    fetch(`${URL_API}/${parameter}?id=${id}&secret=${process.env.SECRET_API}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
    return null;
  }
}
