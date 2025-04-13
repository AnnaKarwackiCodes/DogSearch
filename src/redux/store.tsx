import { combineReducers } from "redux";
import { configureStore } from '@reduxjs/toolkit';
import userInfo from "./reducers/UserInfo";
import searchResults from "./reducers/SearchResults";

const allReducers = combineReducers({
    userInfo: userInfo,
    searchResults: searchResults
});

const store = configureStore({reducer: allReducers});
export default store;