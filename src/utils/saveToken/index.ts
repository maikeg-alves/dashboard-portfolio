import { SetCookie } from '../cookies';

export async function saveToken(token: string) {
  const optionsCookie = {
    path: '/',
    maxAge: 3600 * 24,
    sameSite: 'strict',
  };

  SetCookie('token', token, optionsCookie);

  return true;
}
