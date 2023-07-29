import { useEffect, useRef, useState, useCallback } from "react"
import UsePagesContext from "@/app/_util/UsePagesContext"
import UseAuthContext from "../dev/_util/UseAuthContext"
import { firestoreDB } from "../_util/Firebase"
import { collection, getDocs, where, query, addDoc } from "firebase/firestore"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { initNewPage } from "../dev/_util/SiteComponents"

export default function UserCampaignsMenu(){
    let {state, dispatch} = UsePagesContext()
    let {currentUser} = UseAuthContext()

    let [userCampaigns, setUserCampaigns] = useState([])
    let [isCreationOpen, setCreationOpen] = useState(false)
    let dialogRef = useRef()
    let nameInputRef = useRef()
    
    let getUserCampaigns = useCallback(async () => {
        let availableCampaigns = []
        let collRef = collection(firestoreDB, "campaigns")
        let snapshots = await getDocs(query(collRef, where("ownerUid", "==", currentUser.uid)))
        snapshots.forEach(doc => {
            if(!doc.exists) return;
            availableCampaigns = [...availableCampaigns, {...doc.data(), id: doc.id}]
        })
        setUserCampaigns(availableCampaigns)
    }, [])

    const nameRegEx = new RegExp("^[a-zA-Z0-9-_]+$")

    useEffect(() => {
        if(!currentUser.uid) return;
        
        getUserCampaigns()
            .catch(error => {
                console.error(error)
            })
        
    }, [currentUser])

    return <>
    
        <div className="fixed min-w-[60vw] max-w-[90vw] min-h-[40vh] border border-default-active z-[150] top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            flex flex-col justify-evenly items-center content-start rounded-lg gap-8 p-8
            ">    
            <div className="flex flex-row justify-between items-center gap-6 flex-wrap">
                {userCampaigns.map((c, idx) => (
                    <button className='button-menu-md' key={idx} onClick={() => dispatch({type: "SET_STATE", payload: {edittedCampaign: c.id, isCampaignPublic: c.public, edittedCampaignName: c.name, layout: c.layout, pages: c.pages, currentPage: 0}})}>
                        {c.name}
                    </button>)
                )}
            </div>
            
            <button className='button-menu-sm' onClick={() => {dialogRef.current.showModal(); setCreationOpen(true)}}>
                <FontAwesomeIcon icon={faAdd} className="text-[48px]"/>
            </button>
        </div>

        <dialog ref={dialogRef} className={`dialog-default
            ${isCreationOpen ? '' : 'invisible'}`}>
            <h2 className="self-start font-bold text-lg">Creating new campaign</h2>
            <span className="text-md self-start">
                Set name for your new campaign:
            </span>
            
            <input ref={nameInputRef} className="input-default"/>

            <div className="self-end mt-4 flex flex-row gap-3">
                <button className="button-default" 
                    onClick={() => {setCreationOpen(false); dialogRef.current.close()}}>
                        Cancel
                </button>
                <button className="btn-confirm"
                    onClick={async () => {
                        let newName = nameInputRef.current.value
                        console.log(newName)
                        if(nameRegEx.test(newName)){
                            try{
                                let result = await addDoc(collection(firestoreDB, "campaigns"), {...initNewPage, ownerUid: currentUser.uid, name: nameInputRef.current.value})
                                console.log(result)
                                getUserCampaigns()
                                setCreationOpen(false)
                                dialogRef.current.close()
                            }catch(err){
                                console.error(err)
                                setCreationOpen(false)
                                dialogRef.current.close()
                            }
                        }
                    }}>
                
                    Create <FontAwesomeIcon icon={faAdd}/>
                </button>
            </div>
        </dialog>

    </>
}