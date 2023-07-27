import { useEffect, useState } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"
import UseAuthContext from "../dev/_util/UseAuthContext"
import { firestoreDB } from "../_util/Firebase"
import { collection, getDocs, where, query } from "firebase/firestore"

export default function UserCampaignsMenu(){
    let {state, dispatch} = UsePagesContext()
    let {currentUser} = UseAuthContext()

    let [userCampaigns, setUserCampaigns] = useState([])

    useEffect(() => {
        if(!currentUser.uid) return;
        let getUserCampaigns = async () => {
            let availableCampaigns = []
            let collRef = collection(firestoreDB, "campaigns")
            let snapshots = await getDocs(query(collRef, where("public", "==", true)))
            snapshots.forEach(doc => {
                if(!doc.exists) return;
                availableCampaigns = [...availableCampaigns, {...doc.data(), id: doc.id}]
            })
            setUserCampaigns(availableCampaigns)
        }

        getUserCampaigns()
            .catch(error => {
                console.log("caught an error")
                console.error(error)
            })
        
    }, [currentUser])

    return <>
            {userCampaigns.map((c, idx) => (
                <button className='default-button' key={idx} onClick={() => dispatch({type: "SET_STATE", payload: {edittedCampaign: c.id, layout: c.layout, pages: c.pages, currentPage: 0}})}>
                    {c.name}
                </button>)
            )}
            <button className='default-button'>new campaign</button>
    </>
}