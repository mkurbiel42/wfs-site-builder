'use client'
import "@/app/_styles/Campaign.css"
import Preview from "@/app/_components/Preview";
import LinkButton from "@/app/_components/LinkButton";
import UsePagesContext from "@/app/dev/_util/UsePagesContext";

export default function Page(){
    let {state, dispatch} = UsePagesContext()

    return(
        <>
            <title>{state.layout.props.title}</title>
            <Preview />
            <LinkButton text={"Go back to generator page"} link={"/dev"}/>
        </>
    )
}
