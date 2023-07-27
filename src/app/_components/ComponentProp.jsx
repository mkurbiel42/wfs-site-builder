'use client'

import { Fragment, useCallback, useState } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"
import ComponentPropInput from "./ComponentPropInput"
import GetDefaultPropValue from "../dev/_util/GetDefaultPropValue"
import StylesEditor from "./StylesEditor"
import TextEditor from "./TextEditor"

export default function ComponentProp({name, value, type, nestedType, componentIdx, componentType, isForLayout=false}){
    let {state, dispatch} = UsePagesContext()
    let [isStylesEditorOpen, setStylesEditorOpen] = useState(false)
    let [isTextEditorOpen, setTextEditorOpen] = useState(false)

    let updateValueWithType = useCallback((type, target) => {
        let endValue = ""
        switch (type) {
            case "number":
                endValue = parseInt(target.value)  || ""
                break;

            case "text":
                endValue = target.value
                break;

            case "color":
                endValue = target.value
                break;
            
            case "boolean":
                endValue = target.checked;
                break;

            case "style":
                endValue = {}
                break;

            default:
                break;
        }

        return endValue
    }, [])

    let updateInput = useCallback(e => {
        if(name === "content"){
            dispatch({type: "CHANGE_CHILDREN", payload: {componentIdx, value: e.target.value}})
        }else{
            let endValue = updateValueWithType(type, e.target)

            if(isForLayout){
                dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: endValue}})
                return
            }

            dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: endValue}})
        }   
    }, [])

    function addToArray(){
        let defaultNewValue = null
        if(type === "array"){
            defaultNewValue = ""
        }else{
            defaultNewValue = {}
            Object.entries(nestedType)?.forEach(([name, type]) => {
                defaultNewValue[name] = GetDefaultPropValue(type)
            })
        }

        if(isForLayout){
            dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: [...value, defaultNewValue]}})
            return
        }
        
        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: [...value, defaultNewValue]}})
    }

    function updateArray(e, elIndex){
        let newValue = value.map((v, vIdx) => vIdx !== elIndex ? v : e.target.value)

        if(isForLayout){
            dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: newValue}})
        }

        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: newValue}})
    }

    function removeFromArray(elIndex){
        let newValue = value.filter((v, vIdx) => vIdx !== elIndex)

        if(isForLayout){
            dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: newValue}})
        }

        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: newValue}})
    }

    function updateNestedObject(e, elIndex, propName, nestedVariableType){
        let newValue = value.map((el, elIdx) => elIdx !== elIndex ? el : {...el, [propName]: updateValueWithType(nestedVariableType, e.target)})

        if(isForLayout){
            if(isForLayout){
                dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: newValue}})
            }
        }

        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: newValue}})
    }

    return (
        <div className="components-tree-item-property">
            <span>{name}</span>
            <br />

            {(type === "text" || type === "number") && <ComponentPropInput type={"text"} value={value} onChange={(e) => updateInput(e)}/>}
            {type === "color" && <ComponentPropInput type={"color"} value={value} onChange={(e) => updateInput(e)}/>}
            {type === "boolean" && <ComponentPropInput type={"checkbox"} value={value} onChange={(e) => updateInput(e)}/>}
            {
                type === "array" && 
                <>
                    {value.map((v, eIdx) => (<Fragment key={eIdx}>
                        <ComponentPropInput type={"text"} value={v} onChange={(e) => updateArray(e, eIdx)}/>
                        <button className="default-button" onClick={() => removeFromArray(eIdx)}>-</button>
                    </Fragment>))}

                    <hr/>
                    <button className="default-button" onClick={addToArray}>+</button>
                </>
            }

            {
                (type === "arrayOfObjects" && nestedType) &&
                <>
                    {
                        value.map((v, eIdx) => (
                            <div key={eIdx}>
                                {
                                    Object.entries(nestedType)?.map(([name, type], propIdx) => 
                                        <ComponentPropInput placeholder={name} key={propIdx} type={type} value={v[name]} onChange={(e) => updateNestedObject(e, eIdx, name, type)}/>
                                    )
                                }
                                <button onClick={() => removeFromArray(eIdx)}>-</button>
                            </div>
                        ))
                    }

                    <hr />
                    <button onClick={() => {addToArray()}}>+</button>
                </>
            }

            {
                type === "style" &&
                <>  
                    <button className="default-button" onClick={() => setStylesEditorOpen((open) => !open)}>...styles</button>
                    {isStylesEditorOpen && <StylesEditor componentName={"div"} props={{style: value}} componentChildren={<h1>Example</h1>} idx={componentIdx} propName={name} isOpen={isStylesEditorOpen} setOpen={setStylesEditorOpen}/>}
                </>
                
            }

            {
                type === "content" &&
                <>
                    <button className="default-button" onClick={() => setTextEditorOpen(open => !open)}>...edit</button>
                    {isTextEditorOpen && <TextEditor idx={componentIdx} defaultValue={value} setOpen={() => setTextEditorOpen(open => !open)} propName={"children"}/>}
                </>
                
            }
            
            {!isForLayout && <button className={"default-button"} onClick={() => dispatch({type: "REMOVE_PROP", payload: {componentIdx, prop: name}})}>X</button>}
        </div>)
}