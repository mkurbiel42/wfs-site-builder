import AuthContextProvider from "../dev/_util/AuthContext";

export default function Layout({children}){
    return (
        <AuthContextProvider>
            {children}
        </AuthContextProvider>
    )
}