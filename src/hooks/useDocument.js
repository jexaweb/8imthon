import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

function useDocument(collectionName, documentId) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!documentId) {
      setData(null);
      return;
    }

    const docRef = doc(db, collectionName, documentId);

    const unsub = onSnapshot(
      docRef,
      (docSnap) => {
        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(" Hujjat topilmadi");
          setData(null);
        }
      },
      (err) => {
        console.error(" Xatolik:", err);
        setError("Hujjatni o‘qishda xatolik yuz berdi!");
      }
    );

    return () => unsub();
  }, [collectionName, documentId]);

  return { data, error };
}

export default useDocument;
