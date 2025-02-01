import type { DocumentData, DocumentSnapshot } from "firebase/firestore"

export const getFirestoreDocDataWithId = <T>(doc:DocumentSnapshot<DocumentData, DocumentData>) => {
    const result = {...doc.data(), id: doc.id} as T
    return result
}