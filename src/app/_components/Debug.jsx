'use client'
import UsePagesContext from "../dev/_util/UsePagesContext"
import "./styles/Debug.css"

export default function Debug(props){
    let {state, dispatch} = UsePagesContext()

    return (
        <div className="textarea-wrapper">
            <textarea className="textarea-code" readOnly={true} value={JSON.stringify(state, null, 4)}>
                
            </textarea>
        </div>
        
    )
}