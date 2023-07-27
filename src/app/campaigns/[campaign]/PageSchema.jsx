import Header from "@/app/_components/site/Header"
import Footer from "@/app/_components/site/Footer"

export default function PageSchema({data, searchParams, params, children}){
    let {pages, layout} = data
    let {props} = layout
    let {backgroundColor, color1, color2} = props
    let defaultStyles = {backgroundColor, color: color1}
    
    return (
        <div className="App" style={defaultStyles}>
        {layout.props.showHeader && <Header 
            logoUrl={props.headerLogoUrl} 
            logoLink={props.headerLink}
            logoAlt={props.headerLogoAlt}
            name={searchParams?.email || "{Name}"}
            style={defaultStyles}
        />}
        
        {children}

        {layout.props.showFooter && <Footer 
            logoUrl={props.footerLogoUrl} 
            logoLink={props.footerLogoLink} 
            logoAlt={props.footerLogoAlt}
            links={props.footerLinks}
            style={defaultStyles}
        />}
      </div>
    )
}