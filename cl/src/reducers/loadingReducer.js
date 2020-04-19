const initialState = {
    isLoading:null
}




export default function loadingReducer(state=initialState,action){
    switch(action.type){
        case "SET_LOADING":
            return{
                isLoading:action.payload
            }
        default:
            return state;
    }
}