'use client'
import { createContext, useContext, useEffect, useReducer } from "react"
import pagesReducerAction from "./PagesReducerAction"

const initialState = {}

export const PagesContext = createContext()


export default function PagesContextProvider({children}){
    let [pagesState, dispatchPagesReducer] = useReducer(pagesReducerAction, {...initialState, currentPage: 0})

    return (
        <PagesContext.Provider value={{state: pagesState, dispatch: dispatchPagesReducer}}>
            {children}
        </PagesContext.Provider>
    ) 
}