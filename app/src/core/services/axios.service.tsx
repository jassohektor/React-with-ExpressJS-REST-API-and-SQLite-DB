import { getToken } from "../../shared/utils";
import { app } from "../../shared/utils";
import axios from 'axios';

var apiURL:string = 'http://localhost:8000/api/';
var axiosClient = axios.create({
    baseURL: apiURL,
    timeout:7000,
    headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});

axiosClient.interceptors.request.use((config) => {
    if(!config.headers.get("Authorization") && !window.location.href.endsWith("/login")) {
      const auth = localStorage.getItem(`${app}.auth`);
      if (auth) {
        let data:any = JSON.parse(auth);
        config.headers.set("Authorization",`Bearer ${data.token}`);
      }
      else {
        localStorage.clear();
        window.location.assign('/login');
      }
    }
    return config;
}, (error) => {
    return Promise.reject(error)
});

axiosClient.interceptors.response.use(function (response) {
  if((response.status == 401 || response.status == 403) && !window.location.href.endsWith("/login")){
    localStorage.clear();
    window.location.assign('/login');
  }
  return response;
}, function (error) {
  return Promise.resolve(error);
});

export default axiosClient;