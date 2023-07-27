import "./styles/HeaderFooter.css"

export default function Header({logoUrl, logoLink, logoAlt, name, style}){
    return (
        <header className="header" style={style}>
            <a href={logoLink}>
                <img src={logoUrl} alt={logoAlt}/>
            </a>
            <div className="flex f1 hi">
                <h2 style={{margin: "0px"}}>
                    {name}
                </h2>
            </div>
        </header>
    )
}
