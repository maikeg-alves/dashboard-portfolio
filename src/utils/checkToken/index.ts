import { GetCookie, verifyToken } from '@utils';

export async function checkIfUserIsLoggedIn() {
  const token = GetCookie('token');
  if (token) {
    const decodedToken = await verifyToken(token);
    if (decodedToken) {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
