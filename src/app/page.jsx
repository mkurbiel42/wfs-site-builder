import Link from "next/link"
import "./style.css"

export default function Page(){
    return ( 
        <div className="wrapper-main">
            <div className="centered-abs fit-fit vertical">
                <h1>Campaign builder</h1>
                <div className="info-row">
                    <h2>Sample campaign generated using the builder:<Link href={"/campaigns/ggXUqx1wNEri8kggz2Ke?email=email.in.url@example.com"}>*CLICK*</Link></h2>
                    <h2>Builder available after signing in here:<Link href={"/dev"}>*/dev*</Link></h2>
                </div>
            </div>
        </div>
    )

}
