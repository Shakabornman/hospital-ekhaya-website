import { useEffect, useState } from "react";
import { onAuthStateChanged, type User } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

type AuthState = {
  loading: boolean;
  user: User | null;
  isAdmin: boolean;
};

// Checks the current user's access_control document for the same tags the
// Firestore/Storage rules require ('executive' or 'website-admin'). This is
// purely for the UI decision of what to show — the rules themselves are the
// real enforcement, this just avoids showing an admin form that would fail.
export function useAdminAuth(): AuthState {
  const [state, setState] = useState<AuthState>({ loading: true, user: null, isAdmin: false });

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setState({ loading: false, user: null, isAdmin: false });
        return;
      }
      try {
        const snap = await getDoc(doc(db, "access_control", user.uid));
        const levels: string[] = snap.exists() ? snap.data().accessLevels || [] : [];
        const isAdmin = levels.includes("executive") || levels.includes("website-admin");
        setState({ loading: false, user, isAdmin });
      } catch {
        setState({ loading: false, user, isAdmin: false });
      }
    });
    return unsub;
  }, []);

  return state;
}
