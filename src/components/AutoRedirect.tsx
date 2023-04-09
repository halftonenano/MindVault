'use client';

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";

export default function AutoRedirect() {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = useSupabaseClient();
  const [showNav, setShowNav] = useState(false);

  useEffect(() => {
    (async () => {
      const {data: {user}} = await supabase.auth.getUser();
      if (searchParams?.get('noredirect')) return setShowNav(true);
      if (user) return router.push('/add');
    })();
  }, []);

  return <>{showNav && <Navbar />}</>;
}
