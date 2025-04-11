import React from 'react';
import { Box } from '@mui/material';
import LoginScreen from './Screen/LoginScreen';
import AuthLandingScreen from './Screen/AuthLandingScreen';
import { useSelector } from 'react-redux';

function App() {

  const loginSuccess = useSelector((store: any) => {
    return store.userInfo.loginSuccess;
  });

  return (
    <Box>
      {(loginSuccess === -1 || loginSuccess === 0) && <LoginScreen/>}
      {loginSuccess === 1 && <AuthLandingScreen/>}
    </Box>
  );
}

export default App;
