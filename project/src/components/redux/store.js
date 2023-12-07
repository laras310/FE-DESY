import { configureStore} from '@reduxjs/toolkit';
import user from "./reducers/user"
import dashboardAdmin from "./reducers/dashboardAdmin"
import storage from 'redux-persist/lib/storage';
import {combineReducers} from "redux"; 
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})
  
  export const persistor = persistStore(store)
  /* eslint import/no-anonymous-default-export: [2, {"allowObject": true}] */
