import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://ti-lanche.onrender.com/almoco/'
})