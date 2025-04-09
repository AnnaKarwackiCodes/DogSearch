import { createSlice, configureStore } from '@reduxjs/toolkit'

const userInfo = createSlice({
  name: 'user info',
  initialState: {
    userName: '',
    userEmail: '',
    loginSuccess: -1, //-1 no attempt has been made, 0 failure, 1 Success
  },
  reducers: {
    setUserBaseInfo:(state, action) => {
        state.userName = action.payload.name;
        state.userEmail = action.payload.email;
    },
    setLoginSuccess:(state, action) => {
        state.loginSuccess = action.payload.state;
    }
  }
})

export const { setUserBaseInfo, setLoginSuccess } = userInfo.actions

export default userInfo.reducer;