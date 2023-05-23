
export const authReducer = (state, {type, payload}) => {
    switch(type){
        case "FIRST_NAME":
            return {...state, credentials: {...state.credentials, firstName: payload}}
        case "LAST_NAME":
            return {...state, credentials: {...state.credentials, lastName: payload}}
        case "UPDATE_EMAIL":
            return {...state, credentials:{...state.credentials, email:payload }}
        case "PASSWORD":
            return {...state, credentials:{...state.credentials, password:payload }}    
        case "CONFIRM_PASSWORD":
            return {...state, credentials:{...state.credentials, confirmPassword:payload }}   
        case "SHOW_PASSWORD":  
             return {...state, isPassword: !state.isPassword}   
        case "SET_DETAILS":
             return{...state, token : payload?.token, user:payload?.user}     
        case "AUTHENTICATE":    
            return {...state,token:payload.token, user:payload.user} 
        case "LOGOUT":
            return {token:null} 

          default:
          return state    
    }
}