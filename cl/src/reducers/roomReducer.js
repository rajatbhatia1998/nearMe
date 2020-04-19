const initialState = {
    roomName:"LOL",
        users:[
            {
                username:"Demo",
                coords:{
                    lat:"",
                    lng:""
                }
            },{username:"Demo",
            coords:{
                lat:"",
                lng:""
            }},{username:"Demo",
            coords:{
                lat:"",
                lng:""
            }}
        ]
}



export default function roomReducer(state=initialState,action){
    switch(action.type){
        case "SET_ROOM":
            return action.payload
        default :
                return state;
    }
}