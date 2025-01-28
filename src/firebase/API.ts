import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase-config";

export const getAllCollectionDocs = async<T> (name:string) => {
  const querySnapshot = await getDocs(collection(db, name));
  const data:T[] = [];
  querySnapshot.forEach((doc) => {
    data.push(doc.data() as T);
  });

  return data;
}



export * as API from "./API";