export function SetCookie(name: string, value: string, options: object): void {
  const optionsString = Object.entries(options)
    .map(([key, value]) => `${key}=${value}`)
    .join('; ');

  document.cookie = `${name}=${encodeURIComponent(value)}; ${optionsString}`;
}

export function GetCookie(name: string): string | null {
  if (typeof window === 'undefined') {
    return null;
  }

  const cookies = document.cookie.split(';');

  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.split('=').map((c) => c.trim());
    if (cookieName === name) {
      return decodeURIComponent(cookieValue);
    }
  }
  return null;
}

export function DeleteCookie(name: string): void {
  const expirationDate = new Date('2000-01-01').toUTCString();
  document.cookie = `${name}=; expires=${expirationDate}`;
}
