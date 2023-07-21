'use client'
import { useRef } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"
import "./styles/ComponentsList.css"

export default function ComponentsList(props){
    let {state, dispatch} = UsePagesContext()

    let components = [
        {componentId: 1, name: "Item02", type: "React", defaultProps: {title: "react", info: "react components usage example"}},
        {componentId: 2, name: "ReactComponent", type: "React", defaultProps: {id: state.pages[0].components.length, name: "some name"}},
        {componentId: 3, name: "SpinningWheel", type: "React", defaultProps: {}},
        // {id: 3, name: "Card", type: "Astro", defaultProps: {href:"https://docs.astro.build/", title:"Documentation", body:"Learn how Astro works and explore the official API docs."}}
    ]

    let addComponent = (c) => {
        dispatch({type: "ADD_COMPONENT", payload: {component:{...c, defaultProps: undefined, props: c.defaultProps || [], children: c.children}}})
    }

    let htmlElementInput = useRef()

    return (
        <ul className='components-list'>
            {components.map(c => (<li onClick={() => addComponent(c)} key={c.componentId}>{c.name} ({c.type})</li>))}
            <li>
                <input type="text" ref={htmlElementInput}/>
                <button className={"default-button"} onClick={() => 
                    {
                        if(htmlElementInput.current.value === "") return
                        addComponent({name: htmlElementInput.current.value, type: "HTML", children: [`some ${htmlElementInput.current.value}`]})

                    }}>+</button>
            </li>
        </ul>
    )
}