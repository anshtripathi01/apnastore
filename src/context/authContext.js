import { createContext, useContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducer/authReducer";

const authContext = createContext();



export const AuthProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {token : "", credentials:{firstName : "", lastName : "" ,email:"", password:"", confirmPassword:""}, isPassword:false} )
     useEffect(()=>{
        dispatch({type:"SET_DETAILS",payload:JSON.parse(localStorage.getItem("loginDetails"))})
     },[])

    return(
       <authContext.Provider value={{...state, dispatch}}>
            {children}
       </authContext.Provider>
    )

}

export const useAuth = () => useContext(authContext)