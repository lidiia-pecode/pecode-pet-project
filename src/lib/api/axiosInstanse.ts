import axios from 'axios';
const BASE_URL = 'https://fakestoreapi.com';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});
