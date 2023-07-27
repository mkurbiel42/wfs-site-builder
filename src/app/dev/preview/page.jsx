'use client'
import "@/app/_styles/Campaign.css"
import Preview from "@/app/_components/Preview";
import LinkButton from "@/app/_components/LinkButton";
import UsePagesContext from "@/app/dev/_util/UsePagesContext";
import PageSchema from "@/app/campaigns/[campaign]/PageSchema";
import { JsonToComponent } from "@/app/_util/JsonToComponent";

export default function Page({params, searchParams}){
    let {state, dispatch} = UsePagesContext()

    return(
        <>
            {   
                (state.pages && state.layout) &&
                <>
                    <title>{state.layout?.props.title}</title>
                    <PageSchema data={state} params={params} searchParams={searchParams}>
                        <main className={"main"}>
                            {state.pages[0].components.map((c, idx) => JsonToComponent(c, idx))}
                        </main>
                    </PageSchema>
                </>
            }
            <LinkButton text={"Go back to generator page"} link={"/dev"}/>
        </>
    )
}
