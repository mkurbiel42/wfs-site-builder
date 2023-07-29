'use client'
import "@/app/_styles/Campaign.css"
import "@/app/_components/site/styles/HeaderFooter.css"

import UsePagesContext from "@/app/_util/UsePagesContext"
import {JsonToComponent as json2c} from "@/app/_util/JsonToComponent"
import PageSchema from "../campaigns/[campaign]/PageSchema"


export default function Preview({params}){
    let {state, dispatch} = UsePagesContext();
    
    let currentPage = state.pages.find(p => p.id === state.currentPage)
    let layout = state.layout

    return (
        <>
            <PageSchema data={state} params={params}>
                <main className={"main"}>
                    {
                        currentPage?.components.map((c, idx) => json2c(c, idx))
                    }
                </main>
            </PageSchema>
        </>
       
    )
}