import { createElement as ce } from "react"

import SiteComponents from "../dev/_util/SiteComponents"

const voidTags = ["hr", "br", "img"]

export function JsonToComponent ({displayName, name, props, children, componentId}, idx){
    let componentInfo = SiteComponents.find(c => c.componentId == componentId)
    let component = componentInfo?.import || name
    let componentType = componentInfo?.import ? componentInfo.type : 'HTML'
    // console.log(componentInfo)

    let propsObject = {
        ...props,
        key: `${name}-${idx}`,
    }

    if(voidTags.indexOf(name) != -1){
        return ce(component, {...props, key: `${idx}`})
    }

    if(componentType === "HTML"){
        propsObject["dangerouslySetInnerHTML"] = {__html: children}
        return ce(component, propsObject)
    }

    
    return ce(component, {...props, key: `${idx}`}, children)
}