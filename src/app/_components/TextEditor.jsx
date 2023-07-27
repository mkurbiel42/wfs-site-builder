import { Editor } from "@tinymce/tinymce-react"
import "@/app/_components/styles/TextEditor.css"
import { useState, useRef, useEffect } from "react"
import UsePagesContext from "../dev/_util/UsePagesContext"

export default function TextEditor({defaultValue, idx, propName, setOpen}){
    let {state, dispatch} = UsePagesContext()
    let [textEditorContent, setTextEditorContent] = useState(defaultValue)
    let editorRef = useRef();
    let dialogRef = useRef();

    useEffect(() => {
        // dialogRef.current.showModal()
    }, [])

    return (

        <div ref={dialogRef} className="editor" onCancel={(e) => {e.preventDefault()}}>
            <Editor 
                onInit={(e, editor) => editorRef.current = editor}
                initialValue={textEditorContent}
                init={
                    {
                        content_style: `body {font-family: Helvetica,Arial,sans-serif; font-size:12px; color: ${state.layout.props.color1}}`
                    }
                }
            />
            <div className="editor-buttons">
                <button className="button close" onClick={() => setOpen(false)}>X</button>
                    <button className="button save" 
                    onClick={() => {
                        if(propName === "children"){
                            dispatch({type:"CHANGE_CHILDREN", payload: {componentIdx: idx, prop: propName, value: editorRef.current.getContent()}})
                        }
                        
                        setOpen(false)
                        }
                    }>
                    O</button>
            </div>
        </div>
    )
}