'use client'
import UsePagesContext from "@/app/_util/UsePagesContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowRotateLeft, faBackward, faPowerOff, faUser } from "@fortawesome/free-solid-svg-icons"
import Image from "next/image"
import { useEffect, useState } from "react"
import UseAuthContext from "../dev/_util/UseAuthContext"
import { logOut } from "../_util/Firebase"

export default function UpperBar(){
    let height = 38
    let width = 384/67 * height

    let {currentUser} = UseAuthContext()
    let {state, dispatch} = UsePagesContext();

    let [isUserPanelOpen, setUserPanelOpen] = useState(false)

    return (
        <div className="flex-row flex justify-between content-center items-center bg-slate-800 py-6 px-8 upper border-b-[1px] border-default relative">
            <a href="https://wayfarerpoints.com/">
                <Image src={"/WFSLogo.png"} width={width} height={height} fill={false} alt="WFS Logo"/>
            </a>
            <div className="icon icon-user" onClick={() => setUserPanelOpen(open => !open)}>
                <FontAwesomeIcon icon={faUser} style={{fontSize: "32px", margin: "6px", aspectRatio: "1", transform: "translateY(4px)", scale: 1.1}}/>
            </div>
            
            {
                isUserPanelOpen &&
                <div className="absolute w-64 p-4 gap-2 bg-slate-800 border-default-active border z-[120] right-4 top-[100%] translate-y-[-0.75rem] rounded-md
                    flex flex-col justify-between items-center
                ">
                    <h3>Logged in as:</h3>
                    <span className="text-sm">{currentUser.email}</span>
                    <hr className="border-default"/>
                    {
                        state.edittedCampaign &&
                        <button className="border border-default border-solid px-3 py-1 rounded-md hover:text-slate-50 hover:border-default-active hover:bg-slate-700"
                            onClick={() => dispatch({type: "SET_STATE", payload: {}})}
                        >
                            <FontAwesomeIcon icon={faArrowRotateLeft} /> Menu
                        </button>
                    }
                    
                    <button className="btn-cancel mt-4"
                        onClick={async () => {
                            let {result, error} = await logOut()
                            if(!error) dispatch({type: "SET_STATE", payload: {}})
                        }}
                    >
                         Sign out <FontAwesomeIcon icon={faPowerOff} />
                    </button>
                </div>
            }
            
        </div>
    )
}