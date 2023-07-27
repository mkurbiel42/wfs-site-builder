'use client'

import { useEffect, useRef, useState } from "react"
import { signIn, signOut, firebaseApp, firebaseAuth, logOut } from "../_util/Firebase"
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { redirect, useRouter } from "next/navigation"
import UseAuthContext from "../dev/_util/UseAuthContext"

export default function Page(){
    let {currentUser} = UseAuthContext();
    let [isLoading, setLoading] = useState(true)
    let [errorMsg, setErrorMsg] = useState("")

    let router = useRouter()

    let emailRef = useRef()
    let passwordRef = useRef()

    return (
        <div>
            {
                !currentUser &&
                <>
                    <input type="email" placeholder="Email" ref={emailRef}/>
                    <input type="password" placeholder="Password" ref={passwordRef}/>
                    <button onClick={async () => {
                        let {result, error} = await signIn(emailRef.current.value, passwordRef.current.value)
                        if(error){
                            setErrorMsg(error)
                        }else{
                            router.replace("/dev")
                        }
                    }}>Sign In</button>
                </>
            }


            {(currentUser && currentUser !== "WAITING_FOR_AUTH") && 
                <button 
                    onClick={async () => {
                        let {result, error} = await logOut()
                        if(error){
                            console.log(error)
                        }
                }}>
                    Log Out
                </button>
            }

            
            
        </div>
    )
}