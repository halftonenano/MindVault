'use client';
import WaveAnimation from '@/components/Waves';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { motion } from 'framer-motion';
import GoogleLogo from './google.png'
import Image from 'next/image';

export default function Page() {
  const supabase = useSupabaseClient();

  async function signInWithGoogle() {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: window.location.origin },
    });
  }

  return (
    <>
      <div className="grid min-h-screen place-items-center bg-gradient-to-b from-green-200 to-white">
        <div className="col-start-1 col-end-1 row-start-1 row-end-1 w-screen overflow-hidden grid place-items-center">
          <WaveAnimation />
        </div>
        <motion.button
          onClick={signInWithGoogle}
          className={`relative col-start-1 col-end-1 row-start-1 row-end-1 rounded-lg bg-primary px-6 py-3 flex text-2xl text-white shadow-lg items-center gap-3`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 10,
          }}
        >
          <Image width={36} src={GoogleLogo} alt='google logo' />
          Sign In with Google
        </motion.button>
      </div>
    </>
  );
}
