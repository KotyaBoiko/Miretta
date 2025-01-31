import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

export const getAllDocs = async<T> (name:string) => {
  const querySnapshot = await getDocs(collection(db, name));
  const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));
  return data;
}
export const getFullDoc = async<T> (collectionName: string, docId:string) => {
  const docRef = doc(db, collectionName, docId)
  const docSnap = await getDoc(docRef)
  const data = {...docSnap.data(), id: docSnap.id} as T

  return data;
}

export * as API from "./API";
