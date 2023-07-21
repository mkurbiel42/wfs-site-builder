'use client'
import { useState, useRef } from "react";
import "./styles/ComponentsTreeItem.css"
import UsePagesContext from "../dev/_util/UsePagesContext";
import ComponentProp from "./ComponentProp";
import { JsonToComponent } from "../dev/_util/JsonToComponent";
import StylesEditor from "./StylesEditor";


export default function ComponentsTreeItem({name, type, props, children, idx}){
    let [isExpanded, setExpanded] = useState(false)
    let [areStylesOpen, setStylesOpen] = useState(false)
    let {state, dispatch} = UsePagesContext()

    let propNameRef = useRef()
    let propValueRef = useRef()

    let currentPage = state.pages[state.currentPage]

    return <div className="components-tree-item">
        <div className="components-tree-item-shortform">
            <span className="components-tree-item-name">{idx + 1} - {name}</span>
            <button className={"default-button"} onClick={() => {setExpanded(exp => !exp)}}>
                {isExpanded ? "-" : "+"}
            </button>
        </div>
        {
            isExpanded && 
            <div className="components-tree-item-props">
                <button className={"default-button"} onClick={() => dispatch({type: "REMOVE_COMPONENT", payload: {componentIdx: idx}})}>X</button>
                {Object.entries(props)?.filter(([name, value]) => name !== "style").map(([name, value], pridx) => {
                        return <ComponentProp name={name} value={value} componentIdx={idx} key={pridx}/>
                    }
                )}
                
                {type === "HTML" && <ComponentProp name={"content"} value={children} componentIdx={idx} key={`content=${idx}`}/>}

                {type === "HTML" && <button className="default-button" onClick={() => setStylesOpen((open) => !open)}>...styles</button>}
                
                {areStylesOpen && <>Styles open<StylesEditor idx={idx} componentName={name} props={props} componentChildren={children} isOpen={areStylesOpen} setOpen={setStylesOpen}/></>}

                <hr />

                <input type="text" ref={propNameRef} placeholder="propName"/>
                <input type="text" ref={propValueRef} placeholder="propValue"/>
                <button className={"default-button"} onClick={() => {
                    if(propNameRef.current.value === "style") {
                        return alert("can't change styles this way! use a style editor below")
                    }
                    dispatch({type: "ADD_PROP", payload: {componentIdx: idx, prop: propNameRef.current.value, value: propValueRef.current.value}});
                    propNameRef.current.value = "";
                    propValueRef.current.value = "";
                }}>+</button>
            </div>
        }
        
    </div>
}