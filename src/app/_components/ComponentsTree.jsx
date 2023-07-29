'use client'
import UsePagesContext from "@/app/_util/UsePagesContext";


import LayoutInfo from "./LayoutInfo";

import ComponentsTreeChallenge from "./ComponentsTreeChallenge";

export default function ComponentsTree(props){
    let {state, dispatch} = UsePagesContext()
    let {pages, currentPage} = state;
    let currentPageData = pages.find(p => p.id === state.currentPage)
    return (
        <div className="bg-slate-800 components-tree w-72 border-default border-t-[1px] border-r-[1px] overflow-y-auto">
            {
                currentPageData.type === "page" &&
                <>
                    <h2 className="pt-4 text-center text-lg font-bold">Current page:</h2>
                    <ComponentsTreeChallenge page={currentPageData} key={"currentpage"}/>
                    <hr className="border-default my-2"/>
                </>
            }

            {pages.filter(p => p.type === "challenge").map((p, idx) => {
                return(
                    <ComponentsTreeChallenge page={p} key={p.id}/>
                )}
            )}
        </div>
    )
}