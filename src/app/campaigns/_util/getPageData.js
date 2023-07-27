import { firestoreDB } from "@/app/_util/Firebase"
import { getDoc, doc } from "firebase/firestore"

export default async function getPageData(campaign){
    try{
        let docRef = await getDoc(doc(firestoreDB, "campaigns", campaign))
        console.log(docRef.data())
        return {data: docRef.data()}
    }catch(error){
        return {error}
    }

    // let data ={
    //     "layout": {
    //         "name": "DefaultLayout",
    //         "props": {
    //             "showHeader": true,
    //             "showFooter": true,
    //             "title": "some title",
    //             "headerLogoUrl": "https://placehold.co/520x135",
    //             "headerLogoAlt": "IcelandAir",
    //             "headerLink": "https://www.icelandair.com/",
    //             "footerLinks": [
    //                 {
    //                     "url": "",
    //                     "text": "Index"
    //                 },
    //                 {
    //                     "url": "/tnc",
    //                     "text": "Terms & Conditions"
    //                 },
    //                 {
    //                     "url": "/0",
    //                     "text": "Page 0"
    //                 }
    //             ],
    //             "footerLogoUrl": "https://placehold.co/460x180",
    //             "footerLogoAlt": "WFS Logo",
    //             "footerLogoLink": "https://wayfarersolutions.com/"
    //         }
    //     },
    //     "pages": [
    //         {
    //             "id": 1,
    //             "type": "challenge",
    //             "name": "challenge 1",
    //             "components": [
    //                 {
    //                     "componentId": 3,
    //                     "name": "SpinningWheel",
    //                     "type": "React",
    //                     "props": {},
    //                     "id": 1
    //                 },
    //                 {
    //                     "componentId": 2,
    //                     "name": "ReactComponent",
    //                     "type": "React",
    //                     "props": {
    //                         "id": 1,
    //                         "name": "some name"
    //                     },
    //                     "id": 2
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 2,
    //             "type": "challenge",
    //             "name": "challenge 2",
    //             "components": [
    //                 {
    //                     "componentId": 2,
    //                     "name": "ReactComponent",
    //                     "type": "React",
    //                     "props": {
    //                         "id": 123,
    //                         "name": "some name in the second challenge"
    //                     },
    //                     "id": 1
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 3,
    //             "type": "page",
    //             "name": "Terms and conditions",
    //             "url": "/tnc",
    //             "components": [
    //                 {
    //                     "name": "span",
    //                     "type": "HTML",
    //                     "props": {
    //                         "style": {
    //                             "color": "green"
    //                         }
    //                     },
    //                     "children": "some text on terms and conditions page",
    //                     "id": 1
    //                 }
    //             ]
    //         },
    //         {
    //             "id": 4,
    //             "type": "page",
    //             "name": "Page 0",
    //             "url": "/0",
    //             "components": [
    //                 {
    //                     "name": "h1",
    //                     "type": "HTML",
    //                     "props": {
    //                         "style": {
    //                             "color": "green"
    //                         }
    //                     },
    //                     "children": "some text on page 0",
    //                     "id": 1
    //                 }
    //             ]
    //         }
    //     ],
    //     "currentPage": 2
    // }
    // return data
}