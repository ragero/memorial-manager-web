import axios from "axios";
import Autenticacao from './authentication'



const baseURL = `http://localhost:3000/app`
const baseURLFiles = `http://localhost:3000`
//const urlServer = `http://ragero.net:21082`


const apiRequest = axios.create({
  baseURL: baseURL
});

 apiRequest.interceptors.request.use(async config => {
   if(Autenticacao.isAuthenticade()){
     const token = Autenticacao.getToken();
     config.headers.Authorization = `Bearer ${token}`;
   }
   return config;
});

export {apiRequest,baseURL,baseURLFiles};