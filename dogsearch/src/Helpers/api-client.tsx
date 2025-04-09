import axios from "axios";

const endpoint = "https://frontend-take-home-service.fetch.com";

function login(name: string, email: string){
    console.log(`${name} and ${email}`);
    axios.post(`${endpoint}/auth/login`, {
        name: name,
        email: email
      })
      .then(function (response:any) {
        console.log(response);
        return 'Success';
      })
      .catch(function (error: any) {
        console.log(error);
        return error.message;
      });
}

export {login};