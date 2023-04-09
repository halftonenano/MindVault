'use client';

import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { SessionContextProvider } from '@supabase/auth-helpers-react';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [supabase] = useState(() => createBrowserSupabaseClient());
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <Toaster position="bottom-left" reverseOrder={false} />
      {children}
    </SessionContextProvider>
  );
}
