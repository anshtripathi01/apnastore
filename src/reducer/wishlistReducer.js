
export const wishlistReducer = (state, {type,payload}) =>{

    switch(type){
        case "SET_WISHLIST":
            return {...state, wishlist:payload}
        default:
        return state    
    }
}