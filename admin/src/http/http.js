import axios from 'axios';

const http = axios.create({
  baseURL: 'http://localhost:1991/api'
});

export default http;