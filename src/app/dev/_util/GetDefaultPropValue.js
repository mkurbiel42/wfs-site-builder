export default function GetDefaultPropValue(type){
    let defaultValue = null

    switch (type) {
        case "number":
            defaultValue = 0
            break;

        case "text":
            defaultValue = ""
            break;

        case "color":
            defaultValue = "#ffffff"
            break;

        case "boolean":
            defaultValue = true
            break;

        case "style":
            defaultValue = {}
            break;

        case "array":
            defaultValue = []
            break;

        case "arrayOfObjects":
            defaultValue = []
            break;


        default:
            break;
    }

    return defaultValue
}