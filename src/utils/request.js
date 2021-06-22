import Axios from "axios";

const instance = Axios.create({
  baseURL: 'http://localhost:8001',
  timeout: 3000,
  withCredentials: true,
});

export  default  instance;
