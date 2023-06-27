import { useState, useEffect, useContext, createContext} from "react";
import axiosClient from "../http/AxiosClient";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({
        user: null,
        token: ''
    })
    // default axios
    axiosClient.defaults.headers.common['Authorization'] = auth?.token

    useEffect(()=>{
        const data = localStorage.getItem('auth')
        if (data) {
            const praseData = JSON.parse(data)
            setAuth({
                ...auth,
                user: praseData.user,
                token: praseData.token
            })
        }
        // eslint-disable-next-line
    }, [])

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    )
}

const useAuth = () => useContext(AuthContext)

export {useAuth, AuthProvider}