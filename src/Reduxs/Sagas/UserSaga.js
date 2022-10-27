import {put, takeEvery} from 'redux-saga/effects'
import {Loggin} from '../Reducers'
import AsyncStorage from '@react-native-async-storage/async-storage'
function* userLogin(){
     console.log("called midlware")
   /* let data=yield fetch('https://jsonplaceholder.typicode.com/users');
    data= yield data.json();
    console.log("data",data) 
   yield put({
    type:ADD,
    data
   }) */
  /*  const value=yield AsyncStorage.getItem("login")

   yield put({type:ADD,
    payload:value
  }) */
}


export function* UserSaga(){
    yield takeEvery(Loggin,userLogin)
}


