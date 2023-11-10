import PageContent from "./PageContent"
import getPageData from "../_util/getPageData"
import PageSchema from "./PageSchema"

const metadata = {}


export default async function Page({params, searchParams}){
   let {data, error} = await getPageData(params.campaign)

   

   if(data){
      metadata.title = data.layout.props.title
   } 
   
   return (
      <>
         {data && 
            <PageSchema data={data} searchParams={searchParams} params={params}>
               <PageContent data={{...data, page: 0}}/>
            </PageSchema>
         }

         {
            !data &&
            <h1 style={{textAlign: "center"}}>No such campaign</h1>
         }
      </>
   )
}

export {metadata};