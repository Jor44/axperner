// src/api/axios.js

import axios from 'axios';

const BASE_URL = 'http://localhost:8080/api'; // Use your Spring Boot application's URL

const instance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true
});

export default instance;
