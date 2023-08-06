import { DeleteCookie, GetCookie } from '@utils';

export async function verifyToken(token: string | null) {
  try {
    if (!token) {
      return false;
    }

    const response = await fetch(
      `https://maicon-gabriel-alves.vercel.app/api/login/verifyToken`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (response.status !== 200) {
      if (GetCookie('token')) {
        DeleteCookie('token');
      }
      return false;
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
