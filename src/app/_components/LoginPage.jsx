import { useEffect, useRef, useState } from "react"
import { signIn } from "../_util/Firebase"
import UseAuthContext from "../dev/_util/UseAuthContext";

export default function LoginPage(){
    let {currentUser} = UseAuthContext();
    
    let emailRef = useRef()
    let passwordRef = useRef()

    let [errorMsg, setErrorMsg] = useState("")

    return (
        <div className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]
            flex flex-col justify-between items-center gap-4
            border border-default-active py-6 w-72 rounded-lg
            ">
            {
                !currentUser &&
                <>  
                    <span className="text-sm text-red-600">{errorMsg}</span>
                    <input className="input-default" type="email" placeholder="Email" ref={emailRef}/>
                    <input className="input-default" type="password" placeholder="Password" ref={passwordRef}/>
                    <button className="button-default" onClick={async () => {
                        let {result, error} = await signIn(emailRef.current.value, passwordRef.current.value)
                        if(error) setErrorMsg(error.message)
                        
                    }}>Sign In</button>
                </>
            }
        </div>
    )
}