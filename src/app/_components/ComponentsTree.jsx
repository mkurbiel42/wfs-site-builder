'use client'
import UsePagesContext from "../dev/_util/UsePagesContext";
import ComponentsTreeItem from "./ComponentsTreeItem";
import LayoutInfo from "./LayoutInfo";
import "./styles/ComponentsTree.css"
import SiteComponents from "../dev/_util/SiteComponents";

export default function ComponentsTree(props){
    let {state, dispatch} = UsePagesContext()
    let {pages, currentPage} = state;

    return (
        <>
            <div className="components-tree">
                <div className="components-tree-list">
                    <LayoutInfo />
                    {
                        pages[currentPage].components.map(({name, type, props, children, id, displayName}, idx) => {
                            let propTypes = SiteComponents.find(c => c.name === name)?.propTypes || {}
                            return <ComponentsTreeItem key={`${name}-${id}`} displayName={displayName || name} name={name} props={props} idx={idx} type={type} propTypes={propTypes}>
                                {children}
                            </ComponentsTreeItem>
                        })
                    }
                </div>
            </div>
        </>
    )
}