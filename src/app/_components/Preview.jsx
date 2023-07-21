'use client'
import "@/app/_styles/Campaign.css"
import "@/app/_components/site/styles/HeaderFooter.css"

import UsePagesContext from "@/app/dev/_util/UsePagesContext"
import {JsonToComponent as json2c} from "@/app/dev/_util/JsonToComponent"
import Footer from "./site/Footer"
import Header from "./site/Header"


export default function Preview(){
    let {state, dispatch} = UsePagesContext();
    
    let currentPage = state.pages[state.currentPage]
    let layout = state.layout

    return (
        <>
         <div className="App">
            {layout.props.showHeader ? <Header 
                logoUrl={layout.props.headerLogoUrl} 
                logoLink={layout.props.headerLink}
                logoAlt={layout.props.headerLogoAlt}
                name={"{Placeholder}"}
            /> : null}

            <main className={"main"}>
                {
                    currentPage.components.map((c, idx) => json2c(c, idx))
                }
            </main>

            {layout.props.showFooter ? <Footer 
                logoUrl={layout.props.footerLogoUrl} 
                logoLink={layout.props.footerLogoLink} 
                logoAlt={layout.props.footerLogoAlt}
                links={layout.props.footerLinks}
            /> : null}
        </ div>
        </>
       
    )
}