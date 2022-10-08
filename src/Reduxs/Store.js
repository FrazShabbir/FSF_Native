import {configureStore} from '@reduxjs/toolkit';
import { rootReducer } from './Reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import {UserSaga} from './Sagas'

const middleware=createSagaMiddleware()
export const Store=configureStore({
    reducer:rootReducer,
    middleware:()=>[middleware]
})
middleware.run(UserSaga)
