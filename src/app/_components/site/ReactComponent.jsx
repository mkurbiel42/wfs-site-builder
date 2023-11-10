'use client'

export default function ReactComponent({id, name, list, objectsList, boolean, color, style}){
    return(
        <>
            <div style={{border: "1px solid black", width: "100%", backgroundColor: color}}>
                {id} - {name}
                <div style={{backgroundColor: boolean ? "blue" : "white", color: boolean ? "white" : "black"}}>Am i blue?</div>
                <div>
                    {
                        list?.map((e, eIdx) => <div key={eIdx}>{e}</div>)
                    }
                </div>
                <div>
                    {
                        objectsList?.map((({first, second, third}, idx) => {
                            return <div key={idx} style={{backgroundColor: third}}>{first} - {second}</div>}))
                    }
                    <button style={style}>Example of styling</button>
                </div>
            </div>
        </>
    )
}