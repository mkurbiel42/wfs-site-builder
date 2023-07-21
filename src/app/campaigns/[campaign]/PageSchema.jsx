import Header from "@/app/_components/site/Header"
import Footer from "@/app/_components/site/Footer"

export default function PageSchema({data, searchParams, params, children}){
    let {pages, layout} = data
    
    return (
        <div className="App">
        {layout.props.showHeader && <Header 
            logoUrl={layout.props.headerLogoUrl} 
            logoLink={layout.props.headerLink}
            logoAlt={layout.props.headerLogoAlt}
            name={searchParams.email}
        />}
        
        {children}

        {layout.props.showFooter && <Footer 
            logoUrl={layout.props.footerLogoUrl} 
            logoLink={layout.props.footerLogoLink} 
            logoAlt={layout.props.footerLogoAlt}
            links={layout.props.footerLinks}
        />}
      </div>
    )
}