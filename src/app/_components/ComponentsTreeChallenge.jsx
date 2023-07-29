import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp, faEllipsis, faAdd, faGear, faTrash, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import UsePagesContext from "@/app/_util/UsePagesContext";
import SiteComponents from "../dev/_util/SiteComponents";
import ComponentsTreeItem from "./ComponentsTreeItem";
import { useRef, useEffect, useState } from "react";
import ComponentsList from "./ComponentsList";

export default function ComponentsTreeChallenge({page}){
    let {state, dispatch} = UsePagesContext();
    
    let [isExpanded, setExpanded] = useState(false)
    let [isListOpen, setListOpen] = useState(false)
    let [areSettingsOpen, setSettingsOpen] = useState(false)
    let [isDeletionOpen, setDeletionOpen] = useState(false)
    let deleteDialogRef = useRef()

    let allChallenges = state.pages.filter(p => p.type === "challenge")

    return (
        <>
            <div className={`relative flex flex-col justify-between items-center border-[1px] m-6 rounded-lg p-2 cursor-default
                ${state.currentPage !== page.id ? 'border-default' : 'border-default-active'}
            `}>
                <div className="flex flex-row justify-between items-center w-[100%]">
                    <div className="flex flex-col justify-between items-start w-4">
                        {
                            page.type !== "page" && <>
                                {page !== allChallenges[0] ? 
                                    <FontAwesomeIcon icon={faCaretUp} className="icon" onClick={() => {
                                        dispatch({type: "SWAP_CHALLENGES", payload: {id: page.id, direction: -1}})
                                    }}/> 
                                    : <div className="h-4"></div>}
                                {page !== allChallenges[allChallenges.length - 1] ? 
                                    <FontAwesomeIcon icon={faCaretDown} className="icon" onClick={() => {
                                        dispatch({type: "SWAP_CHALLENGES", payload: {id: page.id, direction: 1}})
                                    }}/> 
                                    : <div className="h-4"></div>}
                            </>
                        }
                        
                    </div>
                    
                    <h3 className="cursor-pointer hover:underline px-4" onClick={() => dispatch({type: "MOVE_PAGES", payload: page.id})}>{!page.url ? page.name : `${page.url} (${page.name})`}</h3>
            
                    <div className="flex flex-col justify-between items-end icon w-4 self-end ml-1 text-lg">
                        {!isExpanded ? <FontAwesomeIcon icon={faEllipsis} onClick={() => setExpanded(expanded => !expanded)}/> 
                            : <FontAwesomeIcon icon={faCaretUp} 
                                onClick={() => {setExpanded(expanded => !expanded); setListOpen(false); setSettingsOpen(false)}} className="text-lg"
                            />}
                    </div>
                </div>
                

                {(isExpanded) && 
                    <>
                        <div className="mt-2 flex flex-col justify-between items-center gap-4 w-[100%]">
                            {page.components.map(({name, type, props, id, children, displayName, componentId}, idx) => {
                                let propTypes = SiteComponents.find(c => c.name === name)?.propTypes || {}
                                return <ComponentsTreeItem page={page} componentId={componentId} key={`${name}-${id}`} lastIdx={page.components.length - 1} displayName={displayName || name} name={name} props={props} idx={idx} type={type} propTypes={propTypes}>
                                    {children}
                                </ComponentsTreeItem>
                            })}
                        </div>
                        
                        <div className="flex flex-row justify-between items-center w-[100%] relative mt-6 mb-2">
                            <FontAwesomeIcon icon={faGear} className="icon text-xl self-start p-1" onClick={() => {
                                if(state.currentPage !== page.id){
                                    dispatch({type: "MOVE_PAGES", payload: page.id}); 
                                    setSettingsOpen(true); 
                                    setListOpen(false)
                                }else{
                                    setSettingsOpen(open => !open); 
                                    setListOpen(false)
                                }
                            }}/>
                            <FontAwesomeIcon icon={faAdd} className="icon text-xl self-end p-1" onClick={() => {
                                if(state.currentPage !== page.id){
                                    dispatch({type: "MOVE_PAGES", payload: page.id}); 
                                    setListOpen(true); 
                                    setSettingsOpen(false)
                                }else{
                                    setListOpen(open => !open); 
                                    setSettingsOpen(false)
                                }
                            }}/>

                            
                        </div>
                        {
                            isListOpen && state.currentPage === page.id &&
                            <ComponentsList pageId={page.id}/>
                        }

                        {
                            areSettingsOpen && state.currentPage === page.id&&
                            <div className="challenge-settings">
                                <input type="div" className="input-default" value={page.name} onChange={(e) => dispatch({type:"CHANGE_PAGE_NAME", payload: {name: e.target.value, id: page.id}})}/>

                                {
                                    page.type === "page" &&
                                    <input type="div" className="input-default" placeholder="url" value={page.url} onChange={(e) => dispatch({type:"CHANGE_PAGE_URL", payload: {url: e.target.value}})}/>
                                }
                               
                                {page.id !== 0 &&
                                    <FontAwesomeIcon icon={faTrash} className="icon-remove self-start"
                                        onClick={() => {setDeletionOpen(true); deleteDialogRef.current.showModal()}}
                                    />
                                }

                                {page.id === 0 && <span className="text-xs text-red-600 self-start">{"Can't delete default page"}</span>}
                            </div>
                        }

                        

                        <dialog ref={deleteDialogRef} className={`dialog-default
                            ${isDeletionOpen ? '' : 'invisible'}`}>
                            <h2 className="self-start font-bold text-lg">Confirmation</h2>
                            <span className="text-md self-start">
                                Are you sure you want to delete this page?
                            </span>
                            <div className="self-end mt-4 flex flex-row gap-3">
                                <button className=" hover:bg-white rounded-md py-1 px-2 border-slate-300 border border-solid hover:text-slate-950" 
                                    onClick={() => {setDeletionOpen(false); deleteDialogRef.current.close()}}>
                                        Cancel
                                </button>
                                <button className="bg-red-600 hover:bg-red-500 rounded-md py-1 px-2 border-red-700 border border-solid text-white"
                                    onClick={() => dispatch({type: "REMOVE_PAGE", payload: {pageId: page.id}})}>
                                
                                    Delete <FontAwesomeIcon icon={faTrash}/>
                                </button>
                            </div>
                        </dialog>
                       
                    </>
                    }
            </div>

            
        </>
    )
}