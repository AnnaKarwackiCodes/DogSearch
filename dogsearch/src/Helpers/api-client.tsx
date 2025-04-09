import axios from "axios";
import { setLoginSuccess, setUserBaseInfo } from "../redux/reducers/UserInfo";

const endpoint = "https://frontend-take-home-service.fetch.com";

function login(name: string, email: string, dispatch:Function){
    console.log(`${name} and ${email}`);
    axios.post(`${endpoint}/auth/login`, {
        name: name,
        email: email
      })
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

export {login};