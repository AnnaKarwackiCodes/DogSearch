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

function getDogBreeds():Promise<any>{
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint}/dogs/breeds`, { withCredentials: true })
    .then(function (response:any){
      resolve(response.data);
    })
    .catch(function (error: any) {
      reject(error);
    });
  })
}

function getDogSearchResults(_breeds:string[], _zipCodes:string[], _ageMin:number, _ageMax:number):Promise<any>{
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint}/dogs/search`,{
      params: {
        breed: _breeds,
        zipCodes: _zipCodes,
        ageMin: _ageMin,
        ageMax: _ageMax
      },
      withCredentials: true
    })
    .then(function (response:any){
      resolve(response.data);
    })
    .catch(function (error: any) {
      reject(error);
    });
  })
}

function getDogs(dogIDArray:any){
  const getDogConfig = {
    method: 'post',
    url: `${endpoint}/dogs`,
    data: dogIDArray,
    withCredentials: true
  }
  axios(getDogConfig)
  .then(function (response:any) {
    console.log(response);
  })
  .catch(function (error: any) {
    console.log(error);
  });
}

function getMatchingDog(dogIDArray:string[]){
  const getMatchDogConfig = {
    method: 'post',
    url: `${endpoint}/dogs/match`,
    body: dogIDArray,
    withCredentials: true
  }
  axios(getMatchDogConfig)
  .then(function (response:any) {
    console.log(response);
  })
  .catch(function (error: any) {
    console.log(error);
  });
}

export {login, logout, getDogBreeds, getDogSearchResults, getDogs, getMatchingDog};