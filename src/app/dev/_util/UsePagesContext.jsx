'use client'
import { useContext } from "react";
import { PagesContext } from "./PagesContext";

export default function UsePagesContext(){
    const context = useContext(PagesContext)

    if(!context){
        console.log("Context error")
        throw new Error("Context not defined or accessed from outside its provider")
    }

    // console.log("context working fine")
    return context
}