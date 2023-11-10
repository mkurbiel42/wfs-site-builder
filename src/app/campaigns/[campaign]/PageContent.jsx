'use client'

import { createContext, useReducer } from "react"
import { JsonToComponent } from "@/app/_util/JsonToComponent"
import { PagesContext } from "@/app/_util/PagesContext"

function AppReducerAction(state, action){
    switch(action.type){
        case "NEXT_CHALLENGE":
            {
                let challengesList = state.pages.filter(p => p.type === "challenge");
                if(state.page != challengesList.length - 1){
                    let newState = {...state, page: state.page + 1}
                    return newState;
                }else{
                    return state;
                }
            }

        case "PREVIOUS_CHALLENGE":
            {
                if(state.page != 0){
                    let newState = {...state, page: state.page - 1}
                    return newState;
                }else{
                    return state;
                } 
            }

        default:
            break
    }
}

export default function PageContent({data}){
    let [appReducerState, appReducerDispatch] = useReducer(AppReducerAction, data)

    let currentPage = appReducerState.pages.filter(p => p.type === "challenge")[appReducerState.page]

    return (
        <PagesContext.Provider value={{state: appReducerState, dispatch: appReducerDispatch}}>
             <main className={"main"}>
                {
                    currentPage ?
                    currentPage.components.map((c, idx) => JsonToComponent(c, idx))
                    :
                    <h1>This challenge has not been defined.</h1>
                }
                {/* <button onClick={() => {appReducerDispatch({type: "PREVIOUS_CHALLENGE"})}}>previous challenge</button>
                <button onClick={() => {appReducerDispatch({type: "NEXT_CHALLENGE"})}}>next challenge</button> */}
            </main>
        </PagesContext.Provider>
    )
}