import axios from 'axios';

const customFetch = axios.create({
  baseURL: '', // Update the base URL for backend
  headers: {Authorization: ''}, // Update the headers for backend 
});

export default customFetch;