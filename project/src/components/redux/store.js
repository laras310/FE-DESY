import { configureStore} from '@reduxjs/toolkit';
import user from "./reducers/user"
import dashboardAdmin from "./reducers/dashboardAdmin"
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux"; 
import { persistReducer, persistStore } from 'redux-persist';
import { thunk } from 'redux-thunk';

const reducers = combineReducers({
  user, dashboardAdmin
})

const persistConfig = {
  key: 'root',
  storage,
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const store = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV !== 'production',
    
  })
  
  export const persistor = persistStore(store)
  /* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
