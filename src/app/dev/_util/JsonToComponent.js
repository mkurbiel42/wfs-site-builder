import { createElement as ce } from "react"
import Item from "../../_components/site/Item02"
import ReactComponent from "../../_components/site/ReactComponent"
import SpinningWheel from "../../_components/site/SpinningWheel"

let componentsClass = {
    "Item02": Item,
    "ReactComponent": ReactComponent,
    "SpinningWheel": SpinningWheel
}

export function JsonToComponent ({name, props, children}, idx){
    let component = componentsClass[name] || name
    // console.log(name, props, children)
    let propsObject = {}

    // Object.entries(props)?.forEach(([key, value]) => {

    //     if(value.toString().toLowerCase() === "true"){
    //         return propsObject[key] = true
    //     }

    //     if(value.toString().toLowerCase() === "false"){
    //         return propsObject[key] = false
    //     }

    //     return propsObject[key] = value
    // })
   
    return ce(component, {...props, key: `${name}-${idx}`}, children)
}