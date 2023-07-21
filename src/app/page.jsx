import Link from "next/link"
import "./style.css"

export default function Page(){
    return ( 
        <div className="wrapper-main">
            <div className="centered-abs fit-fit vertical">
                <h1>Campaign builder</h1>
                <div className="info-row">
                    <h2>Sample campaign generated using the builder:<Link href={"/campaigns/1?email=email.in.url@example.com"}>*/campaigns/1*</Link></h2>
                    <h2>Builder UI presenting a state of campaign above:<Link href={"/dev"}>*/dev*</Link></h2>
                    <hr />
                    <h3>Disclaimers:</h3>
                    <h4>*no backend yet</h4>
                    <h4>*builder does not actually change state of campaings (because of no backend)</h4>
                    <h4>*but the changes are shown in preview</h4>
                    <h4>*work is still in progress</h4>
                    <h4>*styling, both in the builder and in campaigns, is not in its final state</h4>
                    <h4>*components used in a builder are currently just placeholders (with exception of spinning wheel)</h4>
                </div>
            </div>
        </div>
    )

}
