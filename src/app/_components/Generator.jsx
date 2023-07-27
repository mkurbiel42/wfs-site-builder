'use client'
import { useState } from "react"
import "./styles/Generator.css"
import Code from "./Code"
import Debug from "./Debug"
import Preview from "./Preview"
import { useRouter } from "next/navigation"
import UsePagesContext from "../dev/_util/UsePagesContext"

export default function Generator(props){
    let [view, setView] = useState("preview")
    let {state, dispatch} = UsePagesContext()

    let router = useRouter();
    
    function GeneratorNavButton({name}){
        return (
            <button onClick={() => setView(name)} className={`default-button ${view === name ? "active" : ""}`}>
                {name.toUpperCase()}
            </button>
        )
    }

    return (
        <div className="generator">
            <div className="buttons-wrapper">
                <GeneratorNavButton name={"preview"}/>
                <GeneratorNavButton name={"debug"}/>
                {/* <GeneratorNavButton name={"code"}/> */}
            </div>

            {
                view === "preview" ?
                    (<>
                        <button className={"default-button"} onClick={() => {router.push(`/dev/preview${state.pages[state.currentPage]?.url || ""}`)}}>
                            Show full preview
                        </button>
                        <div className="preview-wrapper">
                            <Preview />
                        </div>
                    </>) 
                    : view === "code" ? <Code /> : <Debug />
            }
        </div>
    )
}