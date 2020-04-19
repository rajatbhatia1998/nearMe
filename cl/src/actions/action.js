import {takeLatest,call,put} from 'redux-saga/effects'
import axios from 'axios'



function setCoords(payload){
    const result = axios.post(`/api/user/coords/${payload.id}`,{
        lat:payload.lat,
        lng:payload.lng
    })
    .then((res)=>{
        return res
    }).catch(err=>{
        return err
    })
    return result
}
function getRoomData(payload){
    const result = axios.get(`/api/room/${payload.id}`)
    .then((res)=>{
        return res
    }).catch(err=>{
        return err
    })
    return result
}
function getUserData(payload){
    const result = axios.get(`/api/user/${payload.id}`)
    .then((res)=>{
        return res
    }).catch(err=>{
        return err
    })
    return result
}
function* RequestsetCoords(action){
    var res = yield call(setCoords,action.payload)
    if(res.status===200)
    {
        console.log(res.data.message)
    }else{
        console.log(res.data)
    }
}

function* RequestgetRoomData(action){
    yield put({type:"SET_LOADING",payload:true})
    var res = yield call(getRoomData,action.payload)
    if(res.status===200){
        yield put({type:"SET_ROOM",payload:res.data[0]})
        yield put({type:"SET_LOADING",payload:false})
    }else{
        alert("Couldn't get Room details")
    }
}
function* RequestgetUser(action){
    yield put({type:"SET_LOADING",payload:true})
    var res = yield call(getUserData,action.payload)
    if(res.status===200){
        yield put({type:"SET_USER",payload:res.data})
        yield put({type:"SET_LOADING",payload:false})
    }else{
        alert("Couldn't get User details")
    }
}


export function* watchSaga(){
yield takeLatest("GET_USER",RequestgetUser)
 yield takeLatest("SET_COORDS",RequestsetCoords)
 yield takeLatest("GET_ROOM_DATA",RequestgetRoomData)
}