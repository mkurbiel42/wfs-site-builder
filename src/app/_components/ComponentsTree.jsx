'use client'
import UsePagesContext from "../dev/_util/UsePagesContext";
import ComponentsTreeItem from "./ComponentsTreeItem";
import LayoutInfo from "./LayoutInfo";
import "./styles/ComponentsTree.css"

export default function ComponentsTree(props){
    let {state, dispatch} = UsePagesContext()
    let {pages, currentPage} = state;

    return (
        <>
            <div className="components-tree">
                <div className="components-tree-list">
                    <LayoutInfo />
                    {
                        pages[currentPage].components.map(({name, type, props, children, id}, idx) => {
                            return <ComponentsTreeItem key={`${name}-${id}`} name={name} props={props} idx={idx} type={type}>
                                {children}
                            </ComponentsTreeItem>
                        })
                    }
                </div>
                {/* <div className="components-tree-props">

                </div> */}
            </div>
        </>
    )
}