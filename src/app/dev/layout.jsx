import PagesContextProvider from "@/app/dev/_util/PagesContext"
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