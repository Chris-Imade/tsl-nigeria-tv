import { configureStore, combineReducers } from '@reduxjs/toolkit';
import appSlice from './Slice/AppSlice';

const rootReducer = combineReducers({
  data: appSlice
});

const store = configureStore({
  reducer: rootReducer
});

export default store;