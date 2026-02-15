import { Navigate, Outlet } from "react-router"

const BlockAuthMiddleware = () =>{
    const token = localStorage.getItem('authToken')
    if(token) return <Navigate to={'/'} replace/>
    return <Outlet/>
}

export default BlockAuthMiddleware