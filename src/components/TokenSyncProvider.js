'use client';

import { useEffect } from 'react';
import { fnGetTokenFromLocalStorage } from '@/utils/local';
import Cookies from 'js-cookie';

export function TokenSyncProvider({ children }) {
  useEffect(() => {
    const cookieToken = Cookies.get('auth-token');
    if (!cookieToken) {
      const localToken = fnGetTokenFromLocalStorage();
      console.log('Local token:', localToken);
      if (localToken) {
        Cookies.set('auth-token', localToken, {
          expires: 7,
          path: '/',
          sameSite: 'lax',
          maxAge: 8 * 60 * 60, // 8 hours in seconds
          secure: process.env.NODE_ENV === 'production'
        });
      }
    }
  }, []);

  return children;
}