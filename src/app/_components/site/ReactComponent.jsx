export default function ReactComponent({id, name}){
    return(
        <>
            <div style={{border: "1px solid black", width: "100%"}}>
                {id} - {name}
            </div>
        </>
    )
}