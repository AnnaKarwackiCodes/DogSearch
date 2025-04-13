import { createSlice, configureStore } from '@reduxjs/toolkit'

const userInfo = createSlice({
  name: 'user info',
  initialState: {
    userName: '',
    userEmail: '',
    loginSuccess: -1, //-1 no attempt has been made, 0 failure, 1 Success
    favoriteDogs: [],
    curScreen: 0, // 0 search, 1 favorite
  },
  reducers: {
    setUserBaseInfo:(state, action) => {
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
    },
    setLoginSuccess:(state, action) => {
        state.loginSuccess = action.payload.state;
    },
    addToFavorites:(state, action) => {
      state.favoriteDogs = action.payload.favoriteDogs
    },
    setCurScreen :(state, action) => {
      state.curScreen = action.payload.value
    },
    userReset: (state, action) => {
      state.userName = '';
      state.userEmail = '';
      state.loginSuccess = -1;
      state.favoriteDogs = [];
      state.curScreen = 0;
    }
  }
})

export const { setUserBaseInfo, setLoginSuccess, addToFavorites, setCurScreen, userReset } = userInfo.actions

export default userInfo.reducer;