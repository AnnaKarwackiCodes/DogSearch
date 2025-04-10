import { createSlice, configureStore } from '@reduxjs/toolkit'

const userInfo = createSlice({
  name: 'user info',
  initialState: {
    userName: '',
    userEmail: '',
    loginSuccess: -1, //-1 no attempt has been made, 0 failure, 1 Success
    favoriteDogs: [],
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
      console.log('fav dogs');
      console.log(state.favoriteDogs);
    },
    userReset: (state, action) => {
      state.userName = '';
      state.userEmail = '';
      state.loginSuccess = -1;
      state.favoriteDogs = [];
    }
  }
})

export const { setUserBaseInfo, setLoginSuccess, addToFavorites, userReset } = userInfo.actions

export default userInfo.reducer;