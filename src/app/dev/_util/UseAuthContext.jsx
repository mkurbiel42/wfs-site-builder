import { useContext } from "react"
import { AuthContext } from "./AuthContext"

export default function UseAuthContext(){

    const context = useContext(AuthContext)

    if(!context){
        console.log("Context error")
        throw new Error("Context not defined or accessed from outside its provider")
    }

    // console.log("context working fine")
    return context
}