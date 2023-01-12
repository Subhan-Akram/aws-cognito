import { configureStore} from '@reduxjs/toolkit'
import counterReducer from '../store/reducer-slice/auth'
import logger from "redux-logger"
import {applyMiddleware } from "redux"
import thunkMiddleware from "redux-thunk";
export const store = configureStore({
  reducer: {
    auth: counterReducer,
  }
,middleware:(getDefaultMiddleWare)=>getDefaultMiddleWare().concat(logger,thunkMiddleware),

}
)