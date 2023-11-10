import "@/app/_styles/Campaign.css"

import UsePagesContext from "@/app/_util/UsePagesContext"
import { useEffect, useRef, useState, Fragment } from "react"
import { JsonToComponent } from "../_util/JsonToComponent"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faCheck, faRemove } from "@fortawesome/free-solid-svg-icons"

export default function StylesEditor({componentName, componentDisplayName, componentId, props, componentChildren, idx, setOpen, propName="style"}){
    let dialogRef = useRef()
    let inputRef = useRef()

    let {state, dispatch} = UsePagesContext()

    let previousStyle = props.style || {}
    let [style, setStyle] = useState(previousStyle)

    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/60 z-[800] flex">
            <div className={`fixed top-[50%] w-[45%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[1000] bg-slate-800 p-4 rounded-lg border-default border`}>
                <div className="App styles-main-wrapper">
                    <main className="main styles-comp-wrapper">
                        {(JsonToComponent({name: componentName, props: {...props, style}, children: componentChildren, displayName: componentDisplayName, componentId}, idx))}
                    </main>
                </div>
            
                <div className="w-[100%] styles-header mt-2">
                    <h2>Styles:</h2>
                    <div>
                        <input type="text" className="input-default w-32 mr-2" ref={inputRef}/> 
                        <button className="button-default text-center" onClick={() => {setStyle((s) => ({...s, [inputRef.current.value]: ""}))}}>
                            <FontAwesomeIcon icon={faAdd} className="px-1"/>
                        </button>
                    </div>
                </div>
                
                <div className="w-[100%] flex flex-col justify-between items-center mt-4">
                    {
                        Object.entries(style)?.map(([style, value], idx) =>
                            <div className="w-[60%] flex flex-row justify-between items-center" key={`${style}-${idx}`}>
                                <span>{style}: </span>
                                <input type="text" className="input-default" value={value} onChange={(e) => {setStyle((s) => ({...s, [style]: e.target.value}))}}/>
                            </div>
                        )
                    }
                </div>

                <div className="w-[100%] flex flex-row justify-end items-center mt-6 gap-2">
                    <button className="btn-cancel"
                        onClick={() => setOpen(false)}
                        >
                        Cancel <FontAwesomeIcon icon={faRemove}/>
                    </button>

                    <button className="btn-confirm"
                        onClick={() => {
                            dispatch({type:"CHANGE_PROP", payload: {componentIdx: idx, prop: propName, value: style}})
                            setOpen(false)
                        }}
                        >
                        Save <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </div>

            </div>
        </div>


        // <dialog ref={dialogRef} className="" onCancel={(e) => {e.preventDefault()}}>
            // <div className="App styles-main-wrapper">
            //     <main className="main styles-comp-wrapper">
            //         {JsonToComponent({name: componentName, props: {...props, style}, children: componentChildren, displayName: componentDisplayName, componentId}, idx)}
            //     </main>
            // </div>
           
            // <div className="styles-header">
            //     <h2>Styles:</h2>
            //     <label><input type="text" ref={inputRef}/> <button className="button-default" onClick={() => {setStyle((s) => ({...s, [inputRef.current.value]: ""}))}}>+</button></label>
            // </div>
            
            // <div className="styles-list">
            //     {
            //         Object.entries(style)?.map(([style, value], idx) =>
            //             <div key={`${style}-${idx}`}>
            //                 <label>{style}: </label>
            //                 <input type="text" value={value} onChange={(e) => {setStyle((s) => ({...s, [style]: e.target.value}))}}/>
            //             </div>
            //         )
            //     }
            // </div>
            
        //     <div className="styles-buttons">
        //         <button className="button close" onClick={() => setOpen(false)}>X</button>
        //         <button className="button save" 
        //         onClick={() => {
        //             dispatch({type:"CHANGE_PROP", payload: {componentIdx: idx, prop: propName, value: style}})
        //             setOpen(false)
        //             }
        //         }>
        //         O</button>
        //     </div>
            
        // </dialog>
    )
}