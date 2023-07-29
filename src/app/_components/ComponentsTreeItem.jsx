'use client'
import { useState, useRef } from "react";
import UsePagesContext from "@/app/_util/UsePagesContext";
import ComponentProp from "./ComponentProp";
import StylesEditor from "./StylesEditor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCaretDown, faCaretUp, faEllipsis, faTrash } from "@fortawesome/free-solid-svg-icons";


export default function ComponentsTreeItem({name, displayName, type, props, children, idx, lastIdx, componentId, propTypes, page}){
    let [isExpanded, setExpanded] = useState(false)
    let [areStylesOpen, setStylesOpen] = useState(false)
    let {state, dispatch} = UsePagesContext()

    let propNameRef = useRef()
    let propValueRef = useRef()

    console.log(page.id)

    return <div className="w-[100%] flex flex-col justify-between items-center px-2 text-sm">
        <div className="w-[100%] flex justify-between items-center mt-3">
            <div className="flex flex-col"> 
                {idx !== 0 ? <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={() => {
                                        dispatch({type: "SWAP_COMPONENTS", payload: {pageId: page.id, idx, direction: -1}})
                                    }}/> : <div className="h-3"></div>}

                {idx !== lastIdx ? <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={() => {
                    dispatch({type: "SWAP_COMPONENTS", payload: {pageId: page.id, idx, direction: 1}})
                }}/> : <div className="h-3"></div>} 
                
            </div>
            <span className="">{idx + 1} - {displayName}</span>
           
            <FontAwesomeIcon className="icon" icon={!isExpanded ? faEllipsis : faCaretUp} onClick={() => {setExpanded(exp => !exp)}} />
        </div>

        {
            isExpanded && 
            <div className="flex flex-col justify-between align-center gap-2 w-[100%] ">
                <hr className="mt-1 border-default"/>
                <div className="flex flex-col justify-between items-start gap-2 w-[100%]">
                    

                    {Object.entries(props)?.filter(([name, value]) => name !== "style" || type !== "HTML").map(([name, value], pridx) => {
                            if(type === "HTML"){
                                return <ComponentProp componentId={componentId} componentType={type} name={name} value={value} type={"text"} componentIdx={idx} key={pridx}/>
                            }else{
                                return <ComponentProp componentType={type} name={name} value={value} type={propTypes[name].type} nestedType={propTypes[name].nestedType} componentIdx={idx} key={pridx}/>
                            }
                        }
                    )}
                    
                    {type === "HTML" && <>
                            <div className="component-prop-row">
                                <ComponentProp componentType={type} name={"content"} value={children} type={"content"} componentIdx={idx} key={`content=${idx}`}/>
                            </div>

                            <div className="component-prop-row">
                                style
                                <button className="button-default" onClick={() => setStylesOpen((open) => !open)}>...styles</button>
                            </div> 
                        </> 
                    }
                    
                    {areStylesOpen &&
                        <StylesEditor idx={idx} componentName={name} componentDisplayName={displayName} props={props} componentChildren={children} isOpen={areStylesOpen} setOpen={setStylesOpen}/>
                    }

                    {
                        type === "HTML" && <>
                            <hr className="border-default mt-2"/>
                            <input type="text" className="input-default mt-2" ref={propNameRef} placeholder="propName"/>
                            <input type="text" className="input-default mt-1 mb-2" ref={propValueRef} placeholder="propValue"/>
                            <FontAwesomeIcon icon={faAdd} onClick={() => {
                                if(propNameRef.current.value === "style" ) {
                                    return alert("can't change styles this way! use a style editor below")
                                }

                                if(propNameRef.current.value === "" ) {
                                    return alert("can't add empty tag")
                                }
                                dispatch({type: "ADD_PROP", payload: {componentIdx: idx, prop: propNameRef.current.value, value: propValueRef.current.value}});
                                propNameRef.current.value = "";
                                propValueRef.current.value = "";
                            }}/>

                            <hr className="my-2 border-default"/>
                        </>
                    }
                    

                    <FontAwesomeIcon icon={faTrash} className="icon-remove self-end me-2 mt-1 mb-2" onClick={() => dispatch({type: "REMOVE_COMPONENT", payload: {componentIdx: idx}})}/>
                </div>
        </div>
    }
        
    </div>
}