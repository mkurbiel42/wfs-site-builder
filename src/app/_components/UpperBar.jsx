'use client'
import UsePagesContext from "../dev/_util/UsePagesContext"
import "./styles/UpperBar.css"

export default function UpperBar({children}){
    let {state, dispatch} = UsePagesContext()
    return (
        <div className="upper">
            Current page: {state.pages[state.currentPage].name}
            {children}
        </div>
    )
}