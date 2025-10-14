import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { doc, updateDoc } from "firebase/firestore";
import { getFirebaseErrorMessage } from "../components/Errorld";

export function useLogin() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const _login = async (email, password) => {
    setIsPending(true);
    setError(null);

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);

      // online holatni true qilamiz
      const userRef = doc(db, "users", res.user.uid);
      await updateDoc(userRef, {
        online: true,
      });

      dispatch(login(res.user));
    } catch (err) {
      console.error("Login error:", err.message);
      setError(getFirebaseErrorMessage(err.message));
    } finally {
      setIsPending(false);
    }
  };

  return { _login, isPending, error };
}
