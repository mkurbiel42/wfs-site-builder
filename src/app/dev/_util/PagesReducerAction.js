export default function pagesReducerAction(state, action){
    switch (action.type) {
        case 'SET_STATE':
            {
                let state = action.payload
                return state;
            }
            
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
                let {propTypes, ...componentSpread} = component
                let newState = {...state, pages: state.pages.map((page, idx) => idx !== state.currentPage ? page : {...page, components: [...page.components, {...componentSpread, id: page.components.length}]})}
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

        default:
            return state
            break;
    }
}