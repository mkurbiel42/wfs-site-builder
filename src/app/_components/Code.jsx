'use client'
import { useEffect, useState } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"
import ParseCode from "../dev/_util/ParseCode"
import "./styles/Code.css"


export default function Code(props){
    let {state, dispatch} = UsePagesContext()
    
    let [code, setCode] = useState("")


    useEffect(() => {
        let code = ParseCode(state, state.currentPage)
        // console.log(code)

        setCode(code)
    }, [state])

    return (
        <div className="textarea-wrapper">
            <textarea className="textarea-code" readOnly={true} value={code}>
                
            </textarea>
        </div>
        
    )
}