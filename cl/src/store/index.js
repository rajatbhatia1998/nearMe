import {createStore,combineReducers,applyMiddleware} from 'redux'
import authReducer from '../reducers/authReducer'
import loadingReducer from '../reducers/loadingReducer'
import roomReducer from '../reducers/roomReducer'
import { composeWithDevTools } from 'redux-devtools-extension';
import {watchSaga} from '../actions/action'
import createSagaMiddleware from 'redux-saga'


const saga = createSagaMiddleware()
const store = createStore(combineReducers({
    auth:authReducer,
    loading:loadingReducer,
    room:roomReducer
}),composeWithDevTools(applyMiddleware(saga)))


saga.run(watchSaga)

export default store