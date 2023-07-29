import PagesContextProvider from "@/app/_util/PagesContext"
import AuthContextProvider, { AuthContext } from "@/app/dev/_util/AuthContext"

export default function Layout({children}){
    return (
        <AuthContextProvider>
            <PagesContextProvider>
                {children}
            </PagesContextProvider>
        </AuthContextProvider>
    )
}