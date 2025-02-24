import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux'
import user from './slices/user'
import cupon from './slices/cupon'
const reducer = combineReducers({
    user,
    cupon,
})
const store = configureStore({
  reducer,
})
export default store;