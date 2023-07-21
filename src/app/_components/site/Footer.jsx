'use client'
import "./styles/HeaderFooter.css"
import { usePathname } from "next/navigation"
import Link from "next/link"

export default function Footer({links, logoUrl, logoAlt, logoLink}){
    const pathname = usePathname()
    let [blank, segment, id = "preview", subpage] = pathname.split("/")

    return (
        <footer className="footer">
            <div className="footerButtons">
                {links?.map((l, idx) => <button key={idx}><Link href={`/${segment}/${id}${l.url}`} target={l.targetBlank ? "_blank" : "_self"}>{l.text}</Link></button>)}
            </div>
            <a href={logoLink}>
                <img src={logoUrl} alt={logoAlt}/>
            </a>
        </footer>
    )
}
