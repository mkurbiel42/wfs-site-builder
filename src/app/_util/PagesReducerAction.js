export default function pagesReducerAction(state, action){
    // console.log(action.payload)
    switch (action.type) {
        
        case 'SET_STATE':
            {
                let state = action.payload
                return state;
            }
            
        case "CHANGE_PAGE_NAME":
            {
                let {name, id} = action.payload;
                if(name.length > 20) return state;
                let newState = {...state, pages: state.pages.map((page, idx) => page.id !== id ? page : {...page, name})}
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
                let {component, pageId} = action.payload
                let {propTypes, ...componentSpread} = component
                let newState = {...state, pages: state.pages.map((page, idx) => idx !== pageId ? page : {...page, components: [...page.components, {...componentSpread, id: page.components.length}]})}
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
                let highestId = [...state.pages].sort((a, b) => b.id - a.id)[0].id
                let newState = {...state, pages: [...state.pages, {
                    id: state.pages.length,
                    layout: {
                        name: "DefaultLayout",
                        props: [
                            {name: "title", value: "some title"}
                        ]
                    }, 
                    name: `${type[0].toUpperCase() + type.substr(1)} ${highestId + 1}`,
                    type,
                    components: [],
                    }
                ]}
                return newState;
                break;
            }

        case "REMOVE_PAGE":
            {
                let {pageId} = action.payload;
                let {rest, currentPage} = state
                let newState = {...state, pages: state.pages.filter(p => p.id !== pageId), currentPage: 0}
                console.log(newState)
                return newState
            }

        case "MOVE_PAGES":
            {
                let newState = {...state, currentPage: action.payload}
                return newState;
                break;
            }

        case "CHANGE_LAYOUT_PROP":
            {   
                let {prop, value} = action.payload
                let newState = {...state, layout: {...state.layout, props: {...state.layout.props, [prop]: value}}}
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
                let {isForLayout, componentIdx, prop} = action.payload
                let newState = {}
                if(!isForLayout){
                    newState = {...state, pages: state.pages.map((page,idx) => idx != state.currentPage ? page 
                        : {...page, components: state.pages[state.currentPage].components.map((c, cidx) => {
                            if(cidx !== componentIdx){
                                return c
                            }else{
                                let newProps = {...c.props}
                                delete newProps[prop]
                                return {...c, props: {...newProps}}
                            }
                            
                        })})}
                }else{
                    let newProps = {...state.layout.props}
                    delete newProps[prop]
                    newState = {...state, layout: {...state.layout, props: {...newProps}}}
                }
                
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

        case "SWAP_CHALLENGES":
            {
                let {id, direction} = action.payload
                let currentIdx = state.pages.indexOf(state.pages.find(p => p.id == id))
                let challengesIndexes = []

                state.pages.forEach((p, idx) => {
                    if(p.type === 'page') return;
                    challengesIndexes = [...challengesIndexes, idx];
                })

                let swapIndex = challengesIndexes[challengesIndexes.indexOf(currentIdx) + direction]
                
                let newPages = [...state.pages]
                newPages[currentIdx] = state.pages[swapIndex]
                newPages[swapIndex] = state.pages[currentIdx]

                let newState = {...state, pages: newPages}
                return newState
            }

        case "SWAP_COMPONENTS":
            {
                let {idx, pageId, direction} = action.payload
                let currentIdx = idx
                let swapIdx = idx + direction

                let newState = {...state, pages: state.pages.map(p => {
                    if(p.id !== pageId) return p
                    let newComponents = [...p.components]
                    newComponents[currentIdx] = p.components[swapIdx]
                    newComponents[swapIdx] = p.components[currentIdx]
                    return {...p, components: newComponents}
                })}

                return newState
            }

        default:
            return state
            break;
    }
}