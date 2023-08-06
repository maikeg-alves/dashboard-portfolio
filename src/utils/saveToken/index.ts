import { verifyToken } from '../auth';
import { SetCookie } from '../cookies';

export async function saveToken(token: string) {
  const checkValidToken = await verifyToken(token);

  if (!checkValidToken) {
    return false;
  }

  const optionsCookie = {
    path: '/',
    maxAge: 3600 * 24, // Expires after 1 day
    sameSite: 'strict', // 'strict', 'lax', ou 'none' (dependendo dos requisitos do seu projeto)
  };

  SetCookie('token', token, optionsCookie);

  return true;
}
