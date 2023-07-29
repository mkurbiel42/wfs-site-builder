export default function ParseCode(jsonData, pageId){
    // console.log(pageId)
    let layout = jsonData.layout
    let {components} = jsonData.pages[pageId]
    
    // define variable for astro page code

    let codeBuilder = ""


    // build a build-header for astro page

    codeBuilder += "---\n"

    codeBuilder += `import ${layout.name} from "../layouts/${layout.name}.astro"\n`;

    components.forEach(c => {
        if(codeBuilder.indexOf(`import ${c.name} from`) != -1) return;

        // codeBuilder += `import ${c.name} from "../components/${c.type.toLowerCase()}/${c.name}${c.type === "Astro" ? ".astro" : ""}"\n`;
        codeBuilder += `import ${c.name} from "../_components/${c.name}${c.type === "Astro" ? ".astro" : ""}"\n`;
    })

    codeBuilder += "---\n\n"


    // open used layout and its properties

    // codeBuilder += `<${layout.name} props={${JSON.stringify(layout.props)}}>`
    codeBuilder += `<${layout.name}`

    Object.entries(layout.props)?.forEach(([prop, value]) => {
        if(!layout.props.showHeader && prop.indexOf("header") != -1) return
        if(!layout.props.showFooter && prop.indexOf("footer") != -1) return
        codeBuilder += `${Object.entries(layout.props).length > 3 ? "\n\t" : " "}${prop}={${JSON.stringify(value)}}`
    })

    codeBuilder += ">\n"    
    
    

    // place all components inside defined layout

    components.forEach((c, idx) => {
        codeBuilder += `\n\t<${c.name}${c.type === "React" ? " client:load" : ''}`
        
        if(c.props){
            Object.entries(c.props)?.forEach(([prop, value], j) => {
                codeBuilder += ` ${prop}={${JSON.stringify(value)}}`
            })
        }

        codeBuilder += ">"

        if(c.children){
            codeBuilder += c.children.join("\n")
        }

        codeBuilder += `</${c.name}>`
        
    })

    
    // close layout tag

    codeBuilder += `\n\n</${layout.name}>`


    return codeBuilder
}