'use client'
import UsePagesContext from "../dev/_util/UsePagesContext"
import { Fragment, useRef, useState } from "react";
import "./styles/LayoutInfo.css"
import PageInfo from "./PageInfo";
import ComponentProp from "./ComponentProp";
import { LayoutProps } from "../dev/_util/SiteComponents";

export default function LayoutInfo(){
    let {state, dispatch} = UsePagesContext();
    let [arePropsExpanded, setPropsExpanded] = useState(false);
    
    let layout = state.layout
    let {props, defaultProps} = layout

    let footerLinkTextRef = useRef()
    let footerLinkUrlRef = useRef()

    return <div className={"layout-info"}>
        <PageInfo />
        Layout: <b>{layout.name}</b>
        <hr />
        <div className="layout-info-props">
            <span className={"layout-info-props-header"}>Props:</span>
            <button className={"default-button"} onClick={() => setPropsExpanded((propsExpanded) => !propsExpanded)}>
                {arePropsExpanded ? "-" : "+"}
            </button>
            {
                arePropsExpanded &&
                (<>
                    {Object.entries(props)?.filter(([name, value]) => name !== "style").map(([name, value], pridx) => {
                            return <ComponentProp name={name} value={value} type={LayoutProps[name]?.type} nestedType={LayoutProps[name]?.nestedType} key={pridx} isForLayout={true}/>
                        }  
                    )}
            
                    {/* {Object.entries(layout.props)?.map(([name, value], idx) => (
                        name !== "footerLinks" ?
                            <Fragment key={name + idx}>
                                <span>{name}</span>
                                <input type={idx > 1 ? "text" : "checkbox"} value={idx > 1 ? value : ""} checked={idx <= 1 ? value : null} onChange={(e) => dispatch({type: "CHANGE_LAYOUT_PROP", payload: {name, value: idx > 1 ? e.target.value : e.target.checked}})}/>
                            </Fragment>
                        :
                            <Fragment key={name + idx}>
                                <span>{name}</span>
                                {
                                    value.map(({url, text}, linkIdx) => {
                                        return(
                                                <div key={linkIdx} className="footer-link-entry">
                                                    <input type="text" value={url} onChange={(e) => {
                                                        dispatch({type: "CHANGE_LAYOUT_PROP", payload: {name, value: value.map((link, lIdx) => lIdx != linkIdx ? link: {...link, url: e.target.value})}})
                                                    }}/>
                                                    <input type="text" value={text} onChange={(e) => {
                                                        dispatch({type: "CHANGE_LAYOUT_PROP", payload: {name, value: value.map((link, lIdx) => lIdx != linkIdx ? link: {...link, text: e.target.value})}})
                                                    }}/>
                                                    <button className="default-button" style={{alignSelf: "end"}} onClick={() => {
                                                        dispatch({type: "CHANGE_LAYOUT_PROP", payload: {name, value: value.filter((link, lIdx) => lIdx != linkIdx)}})
                                                    }}>-</button>
                                                </div>
                                        )
                                    })
                                }

                                
                                {
                                        <div key={"addFooterLink"} className="footer-link-entry">
                                            <input type="text" ref={footerLinkUrlRef}/>
                                            <input type="text" ref={footerLinkTextRef}/>

                                            <button className="default-button" style={{alignSelf: "end"}} onClick={() => {
                                                dispatch({type: "CHANGE_LAYOUT_PROP", payload: {name: "footerLinks", value: [...layout.props.footerLinks, {url: footerLinkUrlRef.current.value, text: footerLinkTextRef.current.value}]}})
                                                footerLinkTextRef.current.value = ""
                                                footerLinkUrlRef.current.value = ""
                                            }}>+</button>
                                        </div>
                                }
                            </Fragment>
                    ))} */}
                </>)
            }
        </div>
    </div>
}