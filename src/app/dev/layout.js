import PagesContextProvider from "./_util/PagesContext"

export default function Layout({children}){
    return (
        <PagesContextProvider>
            {children}
        </PagesContextProvider>
    )
}