'use client'
import { useRef } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"
import "./styles/ComponentsList.css"
import SiteComponents from "../dev/_util/SiteComponents"
import GetDefaultPropValue from "../dev/_util/GetDefaultPropValue"
import { collection, doc, setDoc, updateDoc } from "firebase/firestore"
import { firestoreDB } from "../_util/Firebase"

export default function ComponentsList(props){
    let {state, dispatch} = UsePagesContext()

    // let components = [
    //     {componentId: 1, name: "Item02", type: "React", defaultProps: {title: "react", info: "react components usage example"}},
    //     {componentId: 2, name: "ReactComponent", type: "React", defaultProps: {id: state.pages[0].components.length, name: "some name"}},
    //     {componentId: 3, name: "SpinningWheel", type: "React", defaultProps: {}},
    //     // {id: 3, name: "Card", type: "Astro", defaultProps: {href:"https://docs.astro.build/", title:"Documentation", body:"Learn how Astro works and explore the official API docs."}}
    // ]

    let components = SiteComponents
    let addComponent = (c) => {
        let {propTypes} = c
        let props = {}

        if(propTypes){
            Object.entries(propTypes)?.forEach(([key, {type, nestedType}]) => {
                props[key] = GetDefaultPropValue(type)
            })
        }
        

        dispatch({type: "ADD_COMPONENT", payload: {component:{...c, props}}})
    }

    let htmlElementInput = useRef()

    return (
        <ul className='components-list'>
            {components.map(c => (<li onClick={() => addComponent(c)} key={c.componentId}>{c.displayName || c.name} ({c.type})</li>))}
            <li>
                <input type="text" ref={htmlElementInput}/>
                <button className={"default-button"} onClick={() => 
                    {
                        if(htmlElementInput.current.value === "") return
                        addComponent({name: htmlElementInput.current.value, type: "HTML", children: `some ${htmlElementInput.current.value}`})
                    }}>+</button>
            </li>
            <li>
                <h3 style={{color: "lawngreen"}}
                    onClick={async () => {
                        try{
                            let result = await updateDoc(doc(collection(firestoreDB, "campaigns"), state.edittedCampaign), {layout: state.layout, pages: state.pages})
                        }catch(error){
                            console.error(error)
                        }
                    }}
                >
                    Save campaign
                </h3>
            </li>
        </ul>
    )
}