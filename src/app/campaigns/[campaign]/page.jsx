import PageContent from "./PageContent"
import getPageData from "../_util/getPageData"
import PageSchema from "./PageSchema"

const metadata = {}


export default async function Page({params, searchParams}){
   let data = await getPageData()
   // console.log(JSON.stringify(data, null, 3))
    
   metadata.title = data.layout.props.title
   
   return (
      <PageSchema data={data} searchParams={searchParams} params={params}>
         <PageContent data={{...data, page: 0}}/>
      </PageSchema>
   )
}

export {metadata};