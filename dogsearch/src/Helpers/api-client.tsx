import axios from "axios";
import { setLoginSuccess, setUserBaseInfo, userReset } from "../redux/reducers/UserInfo";
import { searchReset } from "../redux/reducers/SearchResults";
import qs from "qs";

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
    dispatch(userReset({}));
    dispatch(searchReset({}));
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

function getDogSearchResults(breeds:string[], zipCodes:string[], ageMin:number, ageMax:number, size: number, sort: string):Promise<any>{
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint}/dogs/search`,{
      params: {
        breeds: breeds,
        zipCodes: zipCodes,
        ageMin: ageMin,
        ageMax: ageMax,
        size: size,
        sort: sort
      },
      paramsSerializer: function (params) {
        return qs.stringify(params, {arrayFormat: 'brackets'})
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

function getDogs(dogIDArray:any):Promise<any>{
  return new Promise((resolve, reject) => {
    const getDogConfig = {
      method: 'post',
      url: `${endpoint}/dogs`,
      data: dogIDArray,
      withCredentials: true
    }
    axios(getDogConfig)
    .then(function (response:any) {
      console.log(response);
      resolve(response);
    })
    .catch(function (error: any) {
      console.log(error);
      reject(error);
    });
  })
}

function getMatchingDog(dogIDArray:string[]):Promise<any>{
  return new Promise((resolve, reject) => {
    const getMatchDogConfig = {
      method: 'post',
      url: `${endpoint}/dogs/match`,
      data: dogIDArray,
      withCredentials: true
    }
    axios(getMatchDogConfig)
    .then(function (response:any) {
      console.log(response);
      resolve(response);
    })
    .catch(function (error: any) {
      console.log(error);
      reject(error);
    });
  })
}

function getPaginationResult(query: string):Promise<any>{
  return new Promise((resolve, reject) => {
    axios.get(`${endpoint}${query}`,{
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

function location(zipCodeArray:string[]):Promise<any>{
  return new Promise((resolve, reject) => {
    const getLocationConfig = {
      method: 'post',
      url: `${endpoint}/locations`,
      body: zipCodeArray,
      withCredentials: true
    }
    axios(getLocationConfig)
    .then(function (response:any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });
  })
}

function locationSearch(city: string, states: string[], geoBoundingBox: any, size: number, from:string):Promise<any>{
  return new Promise((resolve, reject) => {
    const getLocationConfig = {
      method: 'post',
      url: `${endpoint}/locations`,
      body: {
        city: city,
        states: states,
      },
      withCredentials: true
    }
    axios(getLocationConfig)
    .then(function (response:any) {
      console.log(response);
    })
    .catch(function (error: any) {
      console.log(error);
    });
  })
}

export {login, logout, getDogBreeds, getDogSearchResults, getDogs, getMatchingDog, getPaginationResult};