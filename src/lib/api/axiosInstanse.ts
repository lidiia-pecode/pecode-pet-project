import axios from 'axios';

export const FAKE_STORE_API_URL = 'https://fakestoreapi.com';
export const INTERNAL_API_URL =
  process.env.NEXT_PUBLIC_INTERNAL_API_URL || 'http://localhost:3000';

export const api = axios.create({
  baseURL: FAKE_STORE_API_URL, 
  headers: { 'Content-Type': 'application/json' },
});

export const internalApi = axios.create({
  baseURL: INTERNAL_API_URL,
  headers: { 'Content-Type': 'application/json' },
});
