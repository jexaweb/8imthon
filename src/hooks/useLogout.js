import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../components/Errorld";
import { logout } from "../app/features/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { doc, updateDoc } from "firebase/firestore";

export function useLogout() {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState();
  const [error, setError] = useState(null);

  const _logout = async () => {
    try {
      await signOut(auth);
      dispatch(logout());
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.essage);
    } finally {
      setIsPending(false);
    }
  };
  return { _logout, isPending, error };
}
