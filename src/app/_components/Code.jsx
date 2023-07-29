'use client'
import { useEffect, useState } from "react"
import UsePagesContext from "@/app/dev/_util/UsePagesContext"
import ParseCode from "@/app/dev/_util/ParseCode"


export default function Code(props){
    let {state, dispatch} = UsePagesContext()
    
    let [code, setCode] = useState("")


    useEffect(() => {
        let code = ParseCode(state, state.currentPage)

        setCode(code)
    }, [state])

    return (
        <div className="textarea-wrapper">
            <textarea className="textarea-code" readOnly={true} value={code}>
                
            </textarea>
        </div>
        
    )
}