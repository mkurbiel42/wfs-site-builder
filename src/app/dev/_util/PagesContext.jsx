'use client'
import { createContext, useContext, useReducer } from "react"


// const initialState = {
//     layout: {
//         name: "DefaultLayout", 
//         props: {
//             showHeader: true,
//             showFooter: true,
//             title: "some title",
//             headerLogoUrl: "https://placehold.co/520x135",
//             headerLogoAlt: "IcelandAir",
//             headerLink: "https://www.icelandair.com/",
//             footerLinks: [{url: "", text: "Index"}, {url: "/index2", text: "Index2"}, {url: "/0", text: "Page 0"}],
//             footerLogoUrl: "https://placehold.co/460x180",
//             footerLogoAlt: "WFS Logo",
//             footerLogoLink: "https://wayfarersolutions.com/"
//         }        
//     }, 
//     pages: [
//         {
//             name: "Page 0",
//             components: []
//         }
//     ], 
    
//     currentPage: 0}

const initialState = {
    "layout": {
        "name": "DefaultLayout",
        "props": {
            "showHeader": true,
            "showFooter": true,
            "title": "some title",
            "headerLogoUrl": "https://placehold.co/520x135",
            "headerLogoAlt": "IcelandAir",
            "headerLink": "https://www.icelandair.com/",
            "footerLinks": [
                {
                "url": "",
                "text": "Index"
                },
                {
                "url": "/tnc",
                "text": "Terms & Conditions"
                },
                {
                "url": "/0",
                "text": "Page 0"
                }
            ],
            "footerLogoUrl": "https://placehold.co/460x180",
            "footerLogoAlt": "WFS Logo",
            "footerLogoLink": "https://wayfarersolutions.com/"
        }
    },
    "pages": [
        {   
            "id": 1,
            "type": "challenge",
            "name": "challenge 1",
            "components": [
                {
                "componentId": 3,
                "name": "SpinningWheel",
                "type": "React",
                "props": {},
                "id": 1
                },
                {
                    "componentId": 2,
                    "name": "ReactComponent",
                    "type": "React",
                    "props": {
                    "id": 1,
                    "name": "some name"
                    },
                    "id": 2
                }
            ]
        },
        {   
            "id": 2,
            "type": "challenge",
            "name": "challenge 2",
            "components": [
                {
                    "componentId": 2,
                    "name": "ReactComponent",
                    "type": "React",
                    "props": {
                    "id": 123,
                    "name": "some name in the second challenge"
                    },
                    "id": 1
                }
            ]
        },
        {   
            "id": 3,
            "type": "page",
            "name": "Terms and conditions",
            "url": "/tnc",
            "components": [
                {
                    "name": "span",
                    "type": "HTML",
                    "props": {
                    "style": {
                        "color": "green"
                    }
                    },
                    "children": "some text on terms and conditions page",
                    "id": 1
                }
            ]
        },
        {   
            "id": 4,
            "type": "page",
            "name": "Page 0",
            "url": "/0",
            "components": [
                {
                    "name": "h1",
                    "type": "HTML",
                    "props": {
                    "style": {
                        "color": "green"
                    }
                    },
                    "children": "some text on page 0",
                    "id": 1
                }
            ]
        }
    ]
}

export const PagesContext = createContext()

export function pagesReducerAction(state, action){
    switch (action.type) {
        case "CHANGE_PAGE_NAME":
            {
                let {name} = action.payload;
                let newState = {...state, pages: state.pages.map((page, idx) => idx !== state.currentPage ? page : {...page, name})}
                return newState
            }

        case "CHANGE_PAGE_URL": 
            {
                let {url} = action.payload
                let newState = {...state, pages: state.pages.map((page,idx) => idx !== state.currentPage ? page : {...page, url})}
                return newState
            }

        case "ADD_COMPONENT":
            {
                let {component} = action.payload
                let newState = {...state, pages: state.pages.map((page, idx) => idx !== state.currentPage ? page : {...page, components: [...page.components, {...component, id: page.components.length}]})}
                return newState;
                break;
            }
        
        case "REMOVE_COMPONENT":
            {
                let {componentIdx} = action.payload
                let newState = {...state, pages: state.pages.map((page, idx) => idx !== state.currentPage ? page : {...page, components: page.components.filter((c, cidx) => cidx !== componentIdx)})}
                return newState;
                break;
            }

        case "ADD_NEW_PAGE":
            {
                let {type} = action.payload

                let newState = {...state, pages: [...state.pages, {
                    id: state.pages.length + 1,
                    layout: {
                        name: "DefaultLayout",
                        props: [
                            {name: "title", value: "some title"}
                        ]
                    }, 
                    name: `${type} ${state.pages.length}`,
                    type,
                    components: [],
                    }
                ]}
                return newState;
                break;
            }

        case "MOVE_PAGES":
            {
                let newState = {...state, currentPage: action.payload}
                return newState;
                break;
            }

        case "CHANGE_LAYOUT_PROP":
            {   
                let {name, value} = action.payload
                let newState = {...state, layout: {...state.layout, props: {...state.layout.props, [name]: value}}}
                return newState
                break;
            }

        case "CHANGE_PROP":
            {
                let {componentIdx, prop, value} = action.payload
                // console.log(componentIdx, prop, value)
                let newState = {...state, pages: state.pages.map((page,idx) => idx != state.currentPage ? page 
                    : {...page, components: state.pages[state.currentPage].components.map((c, cidx) => cidx !== componentIdx ? c : {...c, props: {...c.props, [prop]: value}})})}
                // console.log(newState)
                return newState
                break;
            }
           
        
        case "ADD_PROP":
            {
                let {componentIdx, prop, value} = action.payload
                let newState = {...state, pages: state.pages.map((page,idx) => idx != state.currentPage ? page 
                    : {...page, components: state.pages[state.currentPage].components.map((c, cidx) => cidx !== componentIdx 
                        ? 
                        c : {...c, props: {...c.props, [prop]: value}})})}
                return newState
                break;
            }

        case "REMOVE_PROP":
            {
                let {componentIdx, prop} = action.payload
                let newState = {...state, pages: state.pages.map((page,idx) => idx != state.currentPage ? page 
                    : {...page, components: state.pages[state.currentPage].components.map((c, cidx) => cidx !== componentIdx ? c : {...c, props: c.props.filter(p => p.name !== prop)})})}
                return newState
                break;
            }
        
        
        case "CHANGE_CHILDREN":
            {
                let {componentIdx, value} = action.payload
                let newState = {...state, pages: state.pages.map((page,idx) => idx != state.currentPage ? page 
                    : {...page, components: state.pages[state.currentPage].components.map((c, cidx) => cidx !== componentIdx ? c : {...c, children: value})})}
                return newState
                break;
            }

        default:
            return state
            break;
    }
}

export default function PagesContextProvider({children}){
    let [pagesState, dispatchPagesReducer] = useReducer(pagesReducerAction, {...initialState, currentPage: 0})

    return (
        <PagesContext.Provider value={{state: pagesState, dispatch: dispatchPagesReducer}}>
            {children}
        </PagesContext.Provider>
    ) 
}