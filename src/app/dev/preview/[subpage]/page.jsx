'use client'
import PageSchema from "@/app/campaigns/[campaign]/PageSchema"
import UsePagesContext from "../../_util/UsePagesContext"
import { JsonToComponent } from "../../_util/JsonToComponent"
import '@/app/_styles/Campaign.css'

export default function Page({params, searchParams}){
    let {state, dispatch} = UsePagesContext()

    let pageData = state.pages.find(p => p.type === "page" && p.url === `/${params.subpage}`)

    return (
        <>  
            <title>{state.layout.props.title}</title>
            <PageSchema data={state} params={params} searchParams={searchParams}>
                <main className={"main"}>
                    {
                        pageData ?    
                        pageData.components.map((c, idx) => JsonToComponent(c, idx))
                        : <h1>No such page</h1>
                    }
                </main>
            </PageSchema>
        </>
    )
}