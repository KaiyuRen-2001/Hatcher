/**
 * Hook that returns the current Supabase auth session.
 * Starts as null and returns the session once it's found.
 * If the user is not logged in, returns null.
 */

import { useEffect, useState } from "react";

import { getUser, setInitialData } from "@/database/dbSupabase";

export default function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setInitialData().then(() => {
      getUser().then((user) => {
        setSession({ user: user });
      });
    });
  }, []);

  return session;
}
/*
import { useEffect, useState } from "react";

import db from "@/database/dbSupabase";

export default function useSession() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    db.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = db.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}*/
