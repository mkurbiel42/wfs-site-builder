import { useRef, useEffect } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"
import "@/app/_components/styles/PageInfo.css"

export default function PageInfo({}){
    let {state, dispatch} = UsePagesContext()
    let currentPage = state.pages[state.currentPage]
    let changeNameRef = useRef()
    let urlRef = useRef()

    useEffect(() => {
        changeNameRef.current.value = currentPage.name
        if(urlRef.current){
            urlRef.current.value = currentPage.url || ""
        }
        
    }, [state.currentPage])

    return (
        <div>
            <div className="page-info-additional">
                <span className={"page-info-name"}>{currentPage.name} {currentPage.type === "page" ? ` (url: ${currentPage.url})` : "(challenge)"}</span>
                
                
                {
                    currentPage.type === "challenge" && 
                    <div className="page-info-positioning">
                        <button className="default-button">{"<<"}</button><button className="default-button">{">>"}</button>
                    </div>
                }
                
                <div className="page-info-changename">
                    <input type="text" defaultValue={currentPage.name} ref={changeNameRef} placeholder="name"/> 
                    <button className="default-button" onClick={() => {
                        dispatch({type: "CHANGE_PAGE_NAME", payload: {name: changeNameRef.current.value}})
                    }}>
                        set
                    </button>
                </div>
                
                {
                    (currentPage.type === "page") &&  
                    <div className="page-info-changename">
                        <input type="text" defaultValue={currentPage.url} ref={urlRef} placeholder="type url here"/> 
                        <button className="default-button" onClick={() => {
                            dispatch({type: "CHANGE_PAGE_URL", payload: {url: urlRef.current.value}})
                        }}>
                            set
                        </button>
                    </div>
                }
                

                <button className="default-button" style={{width: "fit-content", alignSelf: "end"}} onClick={() => {
                    dispatch({type: "REMOVE_PAGE"})
                }}>remove</button>
            </div>
            <hr />
        </div>
    )
}