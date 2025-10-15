import { useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";

export const useRegister = () => {
  const dispatch = useDispatch();

  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const register = async (name, url, email, password) => {
    try {
      setIsPending(true);
      const req = await createUserWithEmailAndPassword(auth, email, password);
      if (!req.user) {
        throw new Error("Regestration failed)");
      }
      await updateProfile(req.user, {
        displayName: name,
        photoURL: url,
      });
      dispatch(login(req.user));

      console.log(req.user);
    } catch (error) {
      setError(getFirebaseErrorMessage(error.message));
      console.log(error.message);
    } finally {
      setIsPending(false);
    }
  };
  return { register, isPending, error };
};
