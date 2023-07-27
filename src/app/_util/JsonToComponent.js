import { createElement as ce } from "react"
import Item from "@/app/_components/site/Item02"
import ReactComponent from "@/app/_components/site/ReactComponent"
import SpinningWheel from "@/app/_components/site/SpinningWheel"

export let componentsClass = {
    "Item02": Item,
    "ReactComponent": ReactComponent,
    "SpinningWheel": SpinningWheel
}

export function JsonToComponent ({name, props, children}, idx){
    let component = componentsClass[name] || name
    return ce(component, {...props, key: `${name}-${idx}`, dangerouslySetInnerHTML: {__html: children}})
    // return ce(component, {...props, key: `${idx}`}, children)
}