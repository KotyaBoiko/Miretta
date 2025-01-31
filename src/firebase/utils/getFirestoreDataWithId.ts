import type { DocumentData, QuerySnapshot } from "firebase/firestore";

export const getFirestoreDataWithId = <T>(data: QuerySnapshot<DocumentData, DocumentData>) => {
  const result = data.docs.map(doc => ({ id: doc.id, ...doc.data() } as T));

  return result;
}