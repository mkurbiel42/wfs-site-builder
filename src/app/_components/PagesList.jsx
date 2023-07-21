'use client'
import UsePagesContext from "../dev/_util/UsePagesContext"
import "./styles/PagesList.css"

export default function PagesList(){
    let {state, dispatch} = UsePagesContext();
    let {pages, currentPage} = state;

    return (
        <>
            <div className="pages-wrapper">
                {pages.filter(p => p.type === "challenge").map((p, i) => <button className={"default-button"} key={i} onClick={() => dispatch({type: "MOVE_PAGES", payload: p.id - 1})}>{p.name}</button>)}
                <button className={"default-button"} onClick={() => dispatch({type: "ADD_NEW_PAGE", payload: {type: "challenge"}})}>+</button>
            </div>
            
            <div className="pages-wrapper">
                {pages.filter(p => p.type === "page").map((p, i) => <button className={"default-button"} key={i} onClick={() => dispatch({type: "MOVE_PAGES", payload: p.id - 1})}>{p.name}</button>)}
                <button className={"default-button"} onClick={() => dispatch({type: "ADD_NEW_PAGE", payload: {type: "page"}})}>+</button>
            </div>
        </>
    )
}