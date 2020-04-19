const intialState = {
    auth:false,
    user:{

    }
}





export default function authReducer(state=intialState,action){
    switch(action.type){
        case "SET_USER":
            return{
                auth:true,
                user:action.payload
            }
            case "RESET_USER":
                return intialState
        default:
            return state;
    }
}