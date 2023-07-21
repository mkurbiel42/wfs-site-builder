import getPageData from "@/app/campaigns/_util/getPageData"
import { JsonToComponent } from "@/app/dev/_util/JsonToComponent"
import PageSchema from "../PageSchema"

// export async function generateStaticParams(){
//     let campaignData = await getPageData()
//     let staticParams = campaignData.pages.filter(p => p.type === "page").map(p => ({subpage: p.url.substring(1)}))
//     console.log(staticParams)
//     return staticParams
// }

export let metadata = {}

export default async function Page({params, searchParams}){
    let campaignData = await getPageData()
    let pageData = campaignData.pages.find(p => p.type === "page" && p.url === `/${params.subpage}`)
    metadata.title = campaignData.layout.props.title

    return (
        <>  
            <PageSchema data={campaignData} params={params} searchParams={searchParams}>
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