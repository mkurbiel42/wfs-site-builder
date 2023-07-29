import { firestoreDB } from "@/app/_util/Firebase"
import { getDoc, doc } from "firebase/firestore"

export default async function getPageData(campaign){
    try{
        let docRef = await getDoc(doc(firestoreDB, "campaigns", campaign))
        return {data: docRef.data()}
    }catch(error){
        return {error}
    }
}