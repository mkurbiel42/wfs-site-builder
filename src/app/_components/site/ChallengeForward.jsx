'use client'
import UsePagesContext from "@/app/_util/UsePagesContext"

export default function ChallengeForward(){
    let {state, dispatch} = UsePagesContext();
    return <button onClick={() => {dispatch({type: "NEXT_CHALLENGE"})}}>
        NEXT CHALLENGE
    </button>
}