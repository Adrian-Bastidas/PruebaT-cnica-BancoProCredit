/**
 * Utility para manejar cookies de forma segura y fácil
 */

interface CookieOptions {
  maxAge?: number; // segundos
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Strict' | 'Lax' | 'None';
}

const DEFAULT_OPTIONS: CookieOptions = {
  path: '/',
  secure: window.location.protocol === 'https:',
  sameSite: 'Lax',
};

export const cookieUtils = {
  /**
   * Establecer una cookie
   */
  set(name: string, value: string, options: CookieOptions = {}): void {
    const mergedOptions = { ...DEFAULT_OPTIONS, ...options };

    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (mergedOptions.maxAge) {
      cookieString += `; Max-Age=${mergedOptions.maxAge}`;
    }
    if (mergedOptions.path) {
      cookieString += `; Path=${mergedOptions.path}`;
    }
    if (mergedOptions.domain) {
      cookieString += `; Domain=${mergedOptions.domain}`;
    }
    if (mergedOptions.secure) {
      cookieString += '; Secure';
    }
    if (mergedOptions.sameSite) {
      cookieString += `; SameSite=${mergedOptions.sameSite}`;
    }

    document.cookie = cookieString;
  },

  /**
   * Obtener una cookie
   */
  get(name: string): string | null {
    const nameEQ = `${encodeURIComponent(name)}=`;
    const cookies = document.cookie.split(';');

    for (let cookie of cookies) {
      cookie = cookie.trim();
      if (cookie.startsWith(nameEQ)) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  },

  /**
   * Eliminar una cookie
   */
  remove(name: string, options: CookieOptions = {}): void {
    this.set(name, '', {
      ...options,
      maxAge: -1,
    });
  },

  /**
   * Obtener todas las cookies como objeto
   */
  getAll(): Record<string, string> {
    const cookies: Record<string, string> = {};
    document.cookie.split(';').forEach((cookie) => {
      const [name, value] = cookie.trim().split('=');
      if (name) {
        cookies[decodeURIComponent(name)] = decodeURIComponent(value);
      }
    });
    return cookies;
  },

  /**
   * Limpiar todas las cookies
   */
  clear(): void {
    document.cookie.split(';').forEach((cookie) => {
      const name = cookie.trim().split('=')[0];
      if (name) {
        this.remove(decodeURIComponent(name));
      }
    });
  },
};
