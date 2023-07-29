import "./styles/Item01.css"

export default function Item({title, info}){
    const showAllProps = () => {
        alert(JSON.stringify({title, info}, null, 3))
    }

    const showTitle = () => {
        alert(title)
    }

    return(
        <div className="item">
            <h2>{title}</h2>
            <h3>{info}</h3>
            <button onClick={showAllProps}>Show all props</button>
            <button onClick={showTitle}>Show title</button>
        </div>
    )
}