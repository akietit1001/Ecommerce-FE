import { useState, useEffect } from "react";
import { useAuth } from "../context/auth";
import { Outlet } from "react-router-dom";
import Auth from "../http/Auth";
import Spinner from "../components/Spinner/Spinner";

export default function PrivateRoutes() {
    const [ok, setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(()=> {
        const authCheck = async () => {
            const res = await Auth.authCheck('api/v1/auth/user-auth')

            if (res.ok) {
                setOk(true)
            } else {
                setOk(false)
            }
        }
        if(auth?.token) {
            authCheck()
        }
    }, [auth?.token])

    return ok ? <Outlet /> : <Spinner />
}