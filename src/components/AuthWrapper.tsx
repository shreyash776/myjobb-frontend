// components/AuthWrapper.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'; 
import type { ReactNode } from 'react';

type AuthWrapperProps = {
  children: ReactNode;
  cookieKey?: string;
  redirectTo?: string;
};

const AuthWrapper = ({
  children,
  cookieKey = 'auth_token',
  redirectTo = '/',
}: AuthWrapperProps) => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const hasCookie = document.cookie
      .split(';')
      .some((cookie) => cookie.trim().startsWith(`${cookieKey}=`));

    if (!hasCookie) {
      router.replace(redirectTo);
    } else {
      setChecked(true);
    }
  }, [cookieKey, redirectTo, router]);

  if (!checked) return null; // Don't render until auth is verified

  return <>{children}</>;
};

export default AuthWrapper;
