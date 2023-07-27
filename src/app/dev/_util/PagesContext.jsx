'use client'
import { createContext, useContext, useEffect, useReducer } from "react"
import pagesReducerAction from "./PagesReducerAction"

// const initialState = {
//     "layout": {
//         "name": "DefaultLayout",
//         "props": {
//             "backgroundColor": "#ffffff",
//             "color1":"#001B71",
//             "color2":"#B6D2FF",
//             "showHeader": true,
//             "showFooter": true,
//             "title": "some title",
//             "headerLogoUrl": "https://placehold.co/520x135",
//             "headerLogoAlt": "IcelandAir",
//             "headerLink": "https://www.icelandair.com/",
//             "footerLinks": [
//                 {
//                 "url": "",
//                 "text": "Index"
//                 },
//                 {
//                 "url": "/tnc",
//                 "text": "Terms & Conditions"
//                 },
//                 {
//                 "url": "/0",
//                 "text": "Page 0"
//                 }
//             ],
//             "footerLogoUrl": "https://placehold.co/460x180",
//             "footerLogoAlt": "WFS Logo",
//             "footerLogoLink": "https://wayfarersolutions.com/"
//         }
//     },
//     "pages": [
//         {   
//             "id": 1,
//             "layout": {
//                 "name": "DefaultLayout",
//                 "props": [
//                     {
//                         "name": "title",
//                         "value": "some title"
//                     }
//                 ]
//             },
//             "name": "Challenge 1",
//             "type": "challenge",
//             "components": []
//         }
//     ]
// }

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