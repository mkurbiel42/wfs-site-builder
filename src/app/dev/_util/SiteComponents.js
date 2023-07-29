import Item from "@/app/_components/site/Item02"
import ReactComponent from "@/app/_components/site/ReactComponent"
import SpinningWheel from "@/app/_components/site/SpinningWheel"
import Image from "next/image"

export const initNewPage = {
	"public": false,
	"layout": {
			"name": "DefaultLayout",
			"props": {
				"backgroundColor": "#ffffff",
				"color1": "#001B71",
				"color2": "#B6D2FF",
				"showHeader": true,
				"showFooter": true,
				"title": "Page title",
				"headerLogoUrl": "https://placehold.co/520x135",
				"headerLogoAlt": "Your logo alt text",
				"headerLink": "https://wayfarersolutions.com/",
				"footerLinks": [
					{
						"url": "",
						"text": "Index"
					},
					{
						"url": "/tnc",
						"text": "Terms & Conditions"
					}
				],
				"footerLogoUrl": "https://placehold.co/460x180",
				"footerLogoAlt": "WFS Logo",
				"footerLogoLink": "https://wayfarersolutions.com/"
			}
		},
	"pages": [
		{
			"id": 0,
			"layout": {
				"name": "DefaultLayout",
				"props": [
					{
						"name": "title",
						"value": "some title"
					}
				]
			},
			"name": "Challenge 0",
			"type": "challenge",
			"components": []
		},
		{
			"id": 1,
			"layout": {
				"name": "DefaultLayout",
				"props": [
					{
						"name": "title",
						"value": "some title"
					}
				]
			},
			"url": "/tnc",
			"name": "Terms & Conditions",
			"type": "page",
			"components": []
		}
	]
}


const SiteComponents = [
    {
        componentId: 1,
        name: "Item02",
        import: Item,
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
        import: ReactComponent,
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
        import: SpinningWheel,
        type: "React",
        propTypes: {}
    },
    {
        componentId: 4,
        displayName: 'Text',
        name: "span",
        type: "HTML"
    },
    {
        componentId: 5,
        displayName: 'Image',
        name: "img",
        type: "HTML",
        propTypes: {
            src: {
                type: "text"
            },
            alt:{
                type: "text"
            }
        }
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