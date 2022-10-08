import {put, takeEvery} from 'redux-saga/effects'
import {ADD,REMOVE} from '../Reducers'

function* users(){
     console.log("called midlware")
  /*  let data=yield fetch('http://192.168.100.3:1000/');
    data= yield data.json();
    console.log("data",data) 
   yield put({
    type:setUser,
    data
   }) */
}


export function* UserSaga(){
    yield takeEvery(ADD,users)
}


