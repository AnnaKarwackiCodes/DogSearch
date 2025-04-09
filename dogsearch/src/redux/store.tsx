import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import userInfo from "./reducers/UserInfo";

const allReducers = combineReducers({
    userInfo: userInfo,
});

const store = configureStore({reducer: allReducers});
export default store;