'use client'
import UsePagesContext from "@/app/_util/UsePagesContext"
import { Fragment, useRef, useState } from "react";
import ComponentProp from "./ComponentProp";
import { LayoutProps } from "../dev/_util/SiteComponents";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faEye, faEyeSlash, faSave } from "@fortawesome/free-solid-svg-icons";
import { updateDoc, doc, collection } from "firebase/firestore";
import { firestoreDB } from "../_util/Firebase";

export default function LayoutInfo(){
    let {state, dispatch} = UsePagesContext();
    let [arePropsExpanded, setPropsExpanded] = useState(false);
    let [isConfirmationOpen, setConfirmationOpen] = useState(false)

    let dialogRef = useRef()
    let layout = state.layout
    let {props, defaultProps} = layout

    let [changesSavedMessage, setChangesSavedMessage] = useState("");

    return <div className="flex flex-col justify-between items-center bg-slate-800 border-default-active border rounded-md w-[100%] text-sm py-4 gap-4">
        <h3 className="text-lg">{state.edittedCampaignName}</h3>

        <a href={`/campaigns/${state.edittedCampaign}`} target="_blank" className="hover:text-slate-100 underline">Click here to see your campaign</a>

        <div className="text-center">
            {
                !state.isCampaignPublic ?
                <span>Campaign is not public. <br /> No one can see it.</span>
                :
                <span>Campaign is public. <br /> Users having link can see it.</span>
            }
            <br />
            <div className="flex flex-row justify-between items-center gap-2">
                <span>Change its visibility here:</span> 
                <FontAwesomeIcon className="icon text-xl" icon={state.isCampaignPublic ? faEye : faEyeSlash}
                    onClick={() => {setConfirmationOpen(true); dialogRef.current.showModal()}}
                />
            </div>                
        </div>

        <button className="btn-confirm self-end mr-4" onClick={async () => {
                try{
                    console.log({layout: state.layout, pages: state.pages})
                    let result = await updateDoc(doc(collection(firestoreDB, "campaigns"), state.edittedCampaign), {layout: state.layout, pages: state.pages})
                    setChangesSavedMessage("Changes saved successfully")
                    setTimeout(() => {setChangesSavedMessage("")}, 5000)
                }catch(error){
                    console.error(error)
                }
        }}>
            Save changes
            <FontAwesomeIcon  className="ml-2" icon={faSave}
            />
        </button>

        {
            changesSavedMessage.length > 0 &&
            <span className="text-xs text-green-500">{changesSavedMessage}</span>
        }

        <hr className="border-default"/>
        <div className="flex flex-row justify-between items-center w-[100%] px-4">
            <span className="text-center">Settings:</span>
            <FontAwesomeIcon className="icon" icon={arePropsExpanded ? faCaretUp : faCaretDown} onClick={() => setPropsExpanded((propsExpanded) => !propsExpanded)}/>
        </div>
            {
                arePropsExpanded && <>
                    <hr className="border-default mb-[-1rem]"/>
                    <div className="max-h-40 overflow-auto text-sm px-4 flex flex-col justify-between items-start gap-2 mt-2">
                        {Object.entries(props)?.filter(([name, value]) => name !== "style").sort().map(([name, value], pridx) => {
                                return <ComponentProp name={name} value={value} type={LayoutProps[name]?.type} nestedType={LayoutProps[name]?.nestedType} key={pridx} isForLayout={true}/>
                            }
                        )}
                    </div>
                </>
            }
        
        <dialog ref={dialogRef} className={`dialog-default ${isConfirmationOpen ? '' : 'invisible'}`}>
            <h2 className="self-start font-bold text-lg">Confirmation</h2>
            <span className="text-md self-start">
                {`Are you sure you want to make your campaign ${state.isCampaignPublic ? "non-public" : "public"}?`}
            </span>
            <div className="self-end mt-4 flex flex-row gap-3">
                <button className="btn-cancel" 
                    onClick={() => {setConfirmationOpen(false); dialogRef.current.close()}}>
                        Cancel
                </button>
                <button className="btn-confirm"
                    onClick={async () => {
                        try{
                            console.log({public: !state.isCampaignPublic})
                            console.log(state.edittedCampaign)
                            await updateDoc(doc(collection(firestoreDB, "campaigns"), state.edittedCampaign), {public: !state.isCampaignPublic})
                            dispatch({type: "SET_STATE", payload: {...state, isCampaignPublic: !state.isCampaignPublic}})
                            setConfirmationOpen(false)
                            dialogRef.current.close()
                        }catch(err){
                            console.error(err)
                        }
                    }}
                >
                    Proceed <FontAwesomeIcon icon={state.isCampaignPublic ? faEyeSlash : faEye} />
                </button>
            </div>
        </dialog>
        
    </div>
}