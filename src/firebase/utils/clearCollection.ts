import { collection, deleteDoc, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";

export const clearCollection = async (path: string) => {
  const ref = collection(db, path);
  const snapshot = await getDocs(ref);
  const deletePromises = snapshot.docs.map((docItem) => deleteDoc(docItem.ref));
  await Promise.all(deletePromises);
};
