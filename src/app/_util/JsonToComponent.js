import { createElement as ce } from "react"

import SiteComponents from "../dev/_util/SiteComponents"

export const allTags = ["html","base","head","style","title","address","article","footer","header","h1","h2","h3","h4","h5","h6","hgroup","nav","section","dd","div","dl","dt","figcaption","figure","hr","li","main","ol","p","pre","ul","abbr","b","bdi","bdo","br","cite","code","data","dfn","em","i","kbd","mark","q","rp","rt","rtc","ruby","s","samp","small","span","strong","sub","sup","time","u","var","wbr","area","audio","map","track","video","embed","object","param","source","canvas","noscript","script","del","ins","caption","col","colgroup","table","tbody","td","tfoot","th","thead","tr","button","datalist","fieldset","form","input","keygen","label","legend","meter","optgroup","option","output","progress","select","details","dialog","menu","menuitem","summary","content","element","shadow","template","acronym","applet","basefont","big","blink","center","dir","frame","frameset","isindex","listing","noembed","plaintext","spacer","strike","tt","xmp"]
const voidTags = ["area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source", "track", "wbr"]

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