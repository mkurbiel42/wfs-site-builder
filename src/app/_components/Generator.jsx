'use client'
import { useState } from "react"
import Preview from "./Preview"
import { useRouter } from "next/navigation"
import UsePagesContext from "@/app/_util/UsePagesContext"
import Debug from "./Debug"

export default function Generator(props){
    let [view, setView] = useState("preview")
    let {state, dispatch} = UsePagesContext()

    let router = useRouter();
    
    function GeneratorNavButton({name}){
        return (
            <button onClick={() => setView(name)} className={`button-default ${view === name ? "active" : ""}`}>
                {name.toUpperCase()}
            </button>
        )
    }

    return (
        <>
            {/* <Debug /> */}
            <button className={"button-default m-4 button-preview w-fit h-fit"} onClick={() => {router.push(`/dev/preview${state.pages[state.currentPage]?.url || ""}`)}}>
                Show full preview
            </button>
            <div className="generator p-4 overflow-x-auto">
            
            
            <div className="preview-wrapper h-auto ">
                <Preview />
            </div>
        </div>
        </>
        
    )
}