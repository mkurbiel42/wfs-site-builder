const SiteComponents = [
    {
        componentId: 1, 
        name: "Item02", 
        type: "React", 
        propTypes: {
            title: {
                "type": "text",
            },
            info: {
                "type": "text",
            },
        }
    },
    {
        componentId: 2, 
        name: "ReactComponent", 
        type: "React",
        propTypes: {
            id: {
                "type": "number",
            },
            name: {
                "type": "text",
            },
            list: {
                "type": "array",
                // "nestedType": "string"
            },
            color: {
                "type": "color"
            },
            boolean: {
                "type": "boolean"
            },
            objectsList: {
                "type": "arrayOfObjects",
                "nestedType": {
                    "first": "number",
                    "second": "text",
                    "third": "color"
                }
            },
            style: {
                "type": "style"
            }
        }
    },
    {
        componentId: 3,
        displayName: "Spinning wheel",
        name: "SpinningWheel",
        type: "React",
        propTypes: {}
    },
    {
        componentId: 4,
        displayName: 'Text/Image/Media',
        name: "div",
        type: "HTML"
    }
]

export const LayoutProps = {
    "backgroundColor": {
        "type": "color"
    },
    "color1":{
        "type": "color"
    },
    "color2":{
        "type": "color"
    },
    "showHeader": {
        "type": "boolean"
    },
    "showFooter": {
        "type": "boolean"
    },
    "title": {
        "type": "text"
    },
    "headerLogoUrl": {
        "type": "text"
    },
    "headerLogoAlt": {
        "type": "text"
    },
    "headerLink": {
        "type": "text"
    },
    "footerLinks": {
        "type": "arrayOfObjects",
        "nestedType": {
            "text": "text",
            "url": "text"
        }
    },
    "footerLogoUrl": {
        "type": "text"
    },
    "footerLogoAlt": {
        "type": "text"
    },
    "footerLogoLink": {
        "type": "text"
    }
}

export default SiteComponents