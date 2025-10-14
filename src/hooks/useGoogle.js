import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useDispatch } from "react-redux";
import { login } from "../app/features/userSlice";
import { getFirebaseErrorMessage } from "../components/Errorld";

export function useGoogle() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const googleProvider = async () => {
    setIsPending(true);
    setError(null);
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (!docSnap.exists()) {
        // 🔹 yangi foydalanuvchi yaratish
        await setDoc(userRef, {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL || "",
          online: true,
          createdAt: new Date(),
        });
      } else {
        // 🔹 mavjud foydalanuvchini online qilish
        await updateDoc(userRef, {
          online: true,
        });
      }

      dispatch(login(user));
    } catch (err) {
      console.error("Google login error:", err.message);
      setError(getFirebaseErrorMessage(err.message));
    } finally {
      setIsPending(false);
    }
  };

  return { googleProvider, isPending, error };
}
