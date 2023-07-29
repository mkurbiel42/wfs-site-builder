export default function ComponentPropInput({value, type, onChange, placeholder, className}){
    return <input className={className} type={type} placeholder={type === "text" ? placeholder : undefined} checked={type !== "checkbox" ? undefined : value} value={type === "checkbox" ? undefined : value} onChange={onChange}/>
}