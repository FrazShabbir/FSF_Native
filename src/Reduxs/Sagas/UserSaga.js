import {put, takeEvery} from 'redux-saga/effects'
import {ADD,REMOVE} from '../Reducers'

function* users(){
     console.log("called midlware")
   /* let data=yield fetch('https://jsonplaceholder.typicode.com/users');
    data= yield data.json();
    console.log("data",data) 
   yield put({
    type:ADD,
    data
   }) */
}


export function* UserSaga(){
    yield takeEvery(ADD,users)
}


