import { createContext, useContext, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

const authContext = createContext();



export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {token : JSON.parse(localStorage.getItem("loginDetails")) ?? "", credentials:{firstName : "", lastName : "" ,email:"", password:"", confirmPassword:""}, isPassword:false} )

    return(
       <authContext.Provider value={{...state, dispatch}}>
            {children}
       </authContext.Provider>
    )

}

export const useAuth = () => useContext(authContext)