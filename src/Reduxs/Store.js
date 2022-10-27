import {configureStore} from '@reduxjs/toolkit';
import {rootReducer} from './Reducers/rootReducer';
import createSagaMiddleware from 'redux-saga';
import {UserSaga} from './Sagas';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {persistReducer, persistStore} from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};
const persistreducer = persistReducer(persistConfig, rootReducer);

const middleware=createSagaMiddleware()

const Store = configureStore({
  reducer: persistreducer,
  middleware: () => [middleware],
});
const PersistStore = persistStore(Store);

export {Store, PersistStore};

middleware.run(UserSaga)

/*  */
