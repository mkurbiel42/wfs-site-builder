'use client'
import UsePagesContext from "@/app/_util/UsePagesContext"

export default function Debug(props){
    let {state, dispatch} = UsePagesContext()

    return (
        <div className="textarea-wrapper">
            <textarea className="textarea-code text-black" readOnly={true} value={JSON.stringify(state, null, 4)}>
                
            </textarea>
        </div>
        
    )
}