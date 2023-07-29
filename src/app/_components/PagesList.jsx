'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import UsePagesContext from "@/app/_util/UsePagesContext"
import { faAdd } from "@fortawesome/free-solid-svg-icons";

export default function PagesList(){
    let {state, dispatch} = UsePagesContext();
    let {pages, currentPage} = state;

    return (
        <div className="flex flex-row justify-start items-center content-center p-4 gap-4 border-default border-b">
            <button className={"button-default"} onClick={() => dispatch({type: "ADD_NEW_PAGE", payload: {type: "page"}})}>
                New page <FontAwesomeIcon icon={faAdd} className="icon"/>
            </button>
            {pages.filter(p => p.type === "page").map((p, i) => <button className={'button-default' + `${state.currentPage === p.id ? " active" : ""}`} key={i} onClick={() => dispatch({type: "MOVE_PAGES", payload: p.id})}>{p.url || p.name}</button>)}
            
        </div>     
    )
}