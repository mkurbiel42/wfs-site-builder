import "@/app/_styles/Campaign.css"
import "@/app/_components/styles/StyleEditor.css"

import UsePagesContext from "../dev/_util/UsePagesContext"
import { useEffect, useRef, useState, Fragment } from "react"
import { JsonToComponent } from "../_util/JsonToComponent"


export default function StylesEditor({componentName, props, componentChildren, idx, setOpen, propName="style"}){
    let dialogRef = useRef()
    let inputRef = useRef()

    let {state, dispatch} = UsePagesContext()

    let previousStyle = props.style || {}
    let [style, setStyle] = useState(previousStyle)
    
    useEffect(() => {
        dialogRef.current.showModal()
    }, [])

    return (
        <dialog ref={dialogRef} className="styles" onCancel={(e) => {e.preventDefault()}}>
            <div className="App styles-main-wrapper">
                <main className="main styles-comp-wrapper">
                    {JsonToComponent({name: componentName, props: {...props, style}, children: componentChildren}, idx)}
                </main>
            </div>
           
            <div className="styles-header">
                <h2>Styles:</h2>
                <label><input type="text" ref={inputRef}/> <button className="default-button" onClick={() => {setStyle((s) => ({...s, [inputRef.current.value]: ""}))}}>+</button></label>
            </div>
            
            <div className="styles-list">
                {
                    Object.entries(style)?.map(([style, value], idx) =>
                        <div key={`${style}-${idx}`}>
                            <label>{style}: </label>
                            <input type="text" value={value} onChange={(e) => {setStyle((s) => ({...s, [style]: e.target.value}))}}/>
                        </div>
                    )
                }
            </div>
            
            <div className="styles-buttons">
                <button className="button close" onClick={() => setOpen(false)}>X</button>
                <button className="button save" 
                onClick={() => {
                    dispatch({type:"CHANGE_PROP", payload: {componentIdx: idx, prop: propName, value: style}})
                    setOpen(false)
                    }
                }>
                O</button>
            </div>
            
        </dialog>
    )
}