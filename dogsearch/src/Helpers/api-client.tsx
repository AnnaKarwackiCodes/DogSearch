import axios from "axios";
import { setLoginSuccess, setUserBaseInfo } from "../redux/reducers/UserInfo";

const endpoint = "https://frontend-take-home-service.fetch.com";



function login(name: string, email: string, dispatch:Function){
    console.log(`${name} and ${email}`);
    const loginConfig = {
      method: 'post',
      url: `${endpoint}/auth/login`,
      data: {
        name: name,
        email: email
      },
      withCredentials: true
    }

    axios(loginConfig)
      .then(function (response:any) {
        console.log(response);
        dispatch(setUserBaseInfo({name: name, email:email}));
        dispatch(setLoginSuccess({state:1}));
      })
      .catch(function (error: any) {
        console.log(error);
        dispatch(setLoginSuccess({state:0}));
      });
}

function logout(dispatch: Function){
  const logoutConfig = {
    method: 'post',
    url: `${endpoint}/auth/logout`,
    withCredentials: true
  }
  axios(logoutConfig)
  .then(function (response:any) {
    console.log(response);
    dispatch(setUserBaseInfo({name: '', email:''}));
    dispatch(setLoginSuccess({state:-1}));
  })
  .catch(function (error: any) {
    console.log(error);
  });
}

function getDogBreeds(){
  axios.get(`${endpoint}/dogs/breeds`, { withCredentials: true })
  .then(function (response:any){
    console.log(response);
  })
  .catch(function (error: any) {
    console.log(error);
  });
}

export {login, logout, getDogBreeds};