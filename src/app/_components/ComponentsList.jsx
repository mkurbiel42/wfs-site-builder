'use client'
import { useRef } from "react"
import UsePagesContext from "@/app/_util/UsePagesContext"
import SiteComponents from "../dev/_util/SiteComponents"
import GetDefaultPropValue from "../dev/_util/GetDefaultPropValue"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faAdd } from "@fortawesome/free-solid-svg-icons"
import { allTags } from "../_util/JsonToComponent"

export default function ComponentsList({pageId}){
    let {state, dispatch} = UsePagesContext()

    let components = SiteComponents
    let addComponent = (c) => {
        console.log(c)
        let {propTypes} = c
        let props = {}

        if(propTypes){
            Object.entries(propTypes)?.forEach(([key, {type, nestedType}]) => {
                props[key] = GetDefaultPropValue(type)
            })
        }
        dispatch({type: "ADD_COMPONENT", payload: {pageId, component:{...c, props}}})
    }

    let htmlElementInput = useRef()

    return (
        <ul className='components-list'>
            {components.map(c => (
                <li onClick={() => addComponent(c)} key={c.componentId}
                    className="components-list-item"
                    >{c.displayName || c.name} ({c.type})
                </li>))}

                <li className="flex flex-row justify-between items-center">
                    <input placeholder="HTML tag name" type="text" ref={htmlElementInput} className="py-4 input-default-high w-[100%] mr-1"/>
                    <FontAwesomeIcon icon={faAdd} className="icon text-xl mb-[0.125rem]" onClick={() => 
                        {
                            console.log(htmlElementInput.current.value, allTags.indexOf(htmlElementInput.current.value))
                            if(htmlElementInput.current.value === "" || allTags.indexOf(htmlElementInput.current.value) == -1) return
                            addComponent({name: htmlElementInput.current.value, type: "HTML", children: `some ${htmlElementInput.current.value}`})
                        }}/>
                </li>
        </ul>
    )
}