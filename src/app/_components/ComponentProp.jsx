'use client'

import UsePagesContext from "../dev/_util/UsePagesContext"

export default function ComponentProp({name, value, componentIdx}){
    let {state, dispatch} = UsePagesContext()

    return (
        <div className="components-tree-item-property">
            <span>{name}</span>
            <br />
            <input value={value} onChange={(e) => {
                if(name === "content"){
                    dispatch({type: "CHANGE_CHILDREN", payload: {componentIdx, value: e.target.value}})
                }else{
                    dispatch({type: "CHANGE_PROP", payload: {componentIdx, prop: name, value: e.target.value}})
                }   
            }}/>
            <button className={"default-button"} onClick={() => dispatch({type: "REMOVE_PROP", payload: {componentIdx, prop: name}})}>X</button>
        </div>)
}