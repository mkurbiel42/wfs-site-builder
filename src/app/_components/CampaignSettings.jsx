import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faAdd } from "@fortawesome/free-solid-svg-icons"
import UsePagesContext from "@/app/_util/UsePagesContext"
import { useState } from "react"
import LayoutInfo from "./LayoutInfo"

export default function CampaignInfo(){
    let {state, dispatch} = UsePagesContext()
    let [areSettingsOpen, setSettingsOpen] = useState(false)


    return (
        <>
            <div className="info grid place-items-center">
                <h3>{state.edittedCampaignName}</h3>
            </div>
            <div className="settings settings-wrapper border-b-[1px] relative">
                <FontAwesomeIcon icon={faGear} className="icon text-[24px]" onClick={() => setSettingsOpen(open => !open)}/>
                {
                    areSettingsOpen &&
                    <div className="w-64 max-h-72 absolute top-[100%] translate-y-[-0.75rem] z-[120]">
                        <LayoutInfo />
                    </div>
                }
            </div>

            

            <div className="add settings-wrapper">
                <FontAwesomeIcon icon={faAdd} className="icon text-[24px]" onClick={() => dispatch({type: "ADD_NEW_PAGE", payload: {type: "challenge"}})}/>
            </div>
        </>
        
    )
}