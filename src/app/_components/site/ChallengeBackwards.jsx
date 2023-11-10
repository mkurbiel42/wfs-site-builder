import UsePagesContext from "@/app/_util/UsePagesContext"

export default function ChallengeBackwards(){
    let {state, dispatch} = UsePagesContext();
    return <button onClick={() => {dispatch({type: "PREVIOUS_CHALLENGE"})}}>
        PREVIOUS CHALLENGE
    </button>
}