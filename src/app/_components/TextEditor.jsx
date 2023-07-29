import { Editor } from "@tinymce/tinymce-react"
import { useState, useRef, useEffect } from "react"
import UsePagesContext from "@/app/_util/UsePagesContext"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCheck, faRemove } from "@fortawesome/free-solid-svg-icons"

export default function TextEditor({defaultValue, idx, propName, setOpen}){
    let {state, dispatch} = UsePagesContext()
    let [textEditorContent, setTextEditorContent] = useState(defaultValue)
    let editorRef = useRef();
    console.log(state.layout.props.color1)
    return (
        <div className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/60 z-[800] flex">

            <div className={`fixed top-[50%] left-[50%] translate-x-[-50%] w-[75%] translate-y-[-50%] z-[1000] bg-slate-800 p-4 rounded-lg border-default border`}>
                <Editor 
                    apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                    onInit={(e, editor) => editorRef.current = editor}
                    initialValue={textEditorContent}
                    init={
                        {
                            content_style: `body {width: 75%; font-family: Helvetica,Arial,sans-serif; font-size:12px; color: ${state.layout.props.color1}}`,
                            // toolbar: 'undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify'
                            font_size_formats: "0.25em 0.5em 0.75em 1em 1.25em 1.5em 1.75em 2em 2.25em 2.5em 3em",
                            font_family_formats: `Andale Mono=andale mono,times; 
                            Arial=arial,helvetica,sans-serif; 
                            Arial Black=arial black,avant garde; 
                            Book Antiqua=book antiqua,palatino; 
                            Comic Sans MS=comic sans ms,sans-serif; 
                            Courier New=courier new,courier; 
                            Georgia=georgia,palatino; 
                            Helvetica=helvetica; 
                            Impact=impact,chicago; 
                            Symbol=symbol; 
                            Segoe UI=segoe ui;
                            Tahoma=tahoma,arial,helvetica,sans-serif; 
                            Terminal=terminal,monaco; 
                            Times New Roman=times new roman,times; 
                            Trebuchet MS=trebuchet ms,geneva; 
                            Verdana=verdana,geneva; 
                            Webdings=webdings; Wingdings=wingdings,zapf dingbats`
                        }
                    }
                />
                <div className="w-[100%] flex flex-row justify-end items-center mt-4 gap-2">
                    <button className="btn-cancel"
                        onClick={() => setOpen(false)}
                        >
                        Cancel <FontAwesomeIcon icon={faRemove}/>
                    </button>

                    <button className="btn-confirm"
                        onClick={() => {
                            if(propName === "children"){
                                dispatch({type:"CHANGE_CHILDREN", payload: {componentIdx: idx, value: editorRef.current.getContent()}})
                            }else{
                                dispatch({type:"CHANGE_PROP", payload: {componentIdx: idx, prop: propName, value: editorRef.current.getContent()}})
                            }
                            setOpen(false)
                            }
                        }
                        >
                        Save <FontAwesomeIcon icon={faCheck}/>
                    </button>
                </div>

            </div>
        </div>
        
    )
}