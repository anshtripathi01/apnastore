import { Navigate, useLocation } from "react-router"
import { useAuth } from "../../../context/authContext"

export const RequiresAuth = ({children}) => {
    const location = useLocation()
    const {token} = useAuth()
    return(
        token? children : <Navigate to = "/login" state={{from:location}}/>
    )
}