'use client'

import { Fragment, useCallback, useState } from "react"
import UsePagesContext from "@/app/_util/UsePagesContext"
import ComponentPropInput from "./ComponentPropInput"
import GetDefaultPropValue from "../dev/_util/GetDefaultPropValue"
import StylesEditor from "./StylesEditor"
import TextEditor from "./TextEditor"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd, faMinus, faRemove, faTrash } from "@fortawesome/free-solid-svg-icons"

export default function ComponentProp({name, value, type, nestedType, componentId, componentIdx, componentType, isForLayout=false}){
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
    }, [value])

    let addToArray = useCallback(() => {
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
    }, [value]) 

    let updateArray = useCallback((e, elIndex) => {
        let newValue = value.map((v, vIdx) => vIdx !== elIndex ? v : e.target.value)

        if(isForLayout){
            dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: newValue}})
            return
        }

        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: newValue}})
    }, [value])

    let removeFromArray = useCallback((elIndex) => {
        let newValue = value.filter((v, vIdx) => vIdx !== elIndex)

        if(isForLayout){
            dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: newValue}})
            return
        }

        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: newValue}})
    }, [value])

    let updateNestedObject = useCallback((e, elIndex, propName, nestedVariableType) => {
        let newValue = value.map((el, elIdx) => elIdx !== elIndex ? el : {...el, [propName]: updateValueWithType(nestedVariableType, e.target)})

        if(isForLayout){
            dispatch({type: "CHANGE_LAYOUT_PROP", payload: {prop: name, value: newValue}})
            return
        }

        dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: newValue}})
    }, [value])

    return (
        <>
            {(type === "text" || type === "number") && 
                <div className="w-[100%]">
                    <span>{name}</span>
                    <ComponentPropInput className={`input-default w-[100%]`} type={"text"} value={value} onChange={(e) => updateInput(e)}/>
                </div>
            }

            {type === "color" && 
                <div className="flex flex-row justify-between items-center w-[100%]">
                    <span>{name}</span>
                    <ComponentPropInput className={`input-default`} type={"color"} value={value} onChange={(e) => updateInput(e)}/>
                </div>  
            }

            {type === "boolean" && 
                <div className="flex flex-row justify-between items-center w-[100%]">
                    <span>{name}</span>
                    <ComponentPropInput type={"checkbox"} value={value} onChange={(e) => updateInput(e)}/>
                </div>
            }

            {
                type === "array" && 
                <>
                    {name}
                    <div className="flex flex-col gap-1 w-[100%]">
                        {value.map((v, eIdx) => (<div className="flex flex-row items-center justify-between gap-2 w-[100%]" key={eIdx}>
                            <span className="text-xs">{eIdx}.</span>
                            <ComponentPropInput className={"input-default w-40"} type={"text"} value={v} onChange={(e) => updateArray(e, eIdx)}/>
                            <FontAwesomeIcon icon={faMinus} onClick={() => removeFromArray(eIdx)} className="icon-remove-sm"/>
                        </div>))}
                    
                        <FontAwesomeIcon className={"icon text-lg self-start my-2"} icon={faAdd} onClick={addToArray}/>
                    </div>
                    <hr className="border-default mt-1"/>
                </>
            }

            {
                (type === "arrayOfObjects" && nestedType) &&
                <>
                    {name}
                    <div className="flex flex-col gap-1 w-[100%]">
                        <hr className="mt-2 border-default"/>
                        {value.map((v, eIdx) => (
                                <Fragment key={eIdx}>
                                    {
                                        Object.entries(nestedType)?.map(([name, type], propIdx) => 
                                            <ComponentPropInput className={"input-default w-[100%]"} placeholder={name} key={propIdx} type={type} value={v[name]} onChange={(e) => updateNestedObject(e, eIdx, name, type)}/>
                                        )
                                    }
                                    <FontAwesomeIcon icon={faMinus} onClick={() => removeFromArray(eIdx)} className="icon-remove self-end"/>
                                    <hr className="mb-4 border-default"/>
                                </Fragment>
                        ))}
                    </div>

                    
                    <FontAwesomeIcon icon={faAdd} onClick={() => {addToArray()}} className="icon text-lg mb-2"/>
                </>
            }

            {
                type === "style" &&
                <div className="component-prop-row">  
                    {name}
                    <button className="button-default" onClick={() => setStylesEditorOpen((open) => !open)}>...styles</button>
                    {isStylesEditorOpen && 
                        <StylesEditor componentId={componentId} componentName={"div"} componentDisplayName={""} props={{style: value}} componentChildren={<h1>Example</h1>} idx={componentIdx} propName={name} isOpen={isStylesEditorOpen} setOpen={setStylesEditorOpen}/>
                    }
                </div>
                
            }

            {
                type === "content" &&
                <div className="component-prop-row">
                    {name}
                    <button className="button-default" onClick={() => setTextEditorOpen(open => !open)}>...edit</button>
                    {isTextEditorOpen && 
                        <TextEditor idx={componentIdx} defaultValue={value} setOpen={() => setTextEditorOpen(open => !open)} propName={"children"}/>
                    }
                </div>
                
            }
            
            {(!isForLayout && componentType == "HTML" && type !== "content") &&
                <FontAwesomeIcon icon={faTrash} className="icon-remove-sm" onClick={() => dispatch({type: "REMOVE_PROP", payload: {componentIdx, prop: name}})}/>
            }
        </>)
}