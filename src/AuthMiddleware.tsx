import { Navigate, Outlet } from "react-router"

const AuthMiddleware = () =>{
const token = localStorage.getItem("authToken")

if(!token) return <Navigate to={'/auth/login'} replace/>
return <Outlet/>
}

export default AuthMiddleware