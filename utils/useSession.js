/**
 * Hook that returns the current Supabase auth session.
 * Starts as null and returns the session once it's found.
 * If the user is not logged in, returns null.
 */

import { useEffect, useState } from "react";

import { getUser, setInitialData } from "@/database/db";

export default function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setInitialData().then(() => {
      getUser().then((user) => {
        console.log(user);
        setSession({ user: user });
      });
    });
  }, []);

  return session;
}
