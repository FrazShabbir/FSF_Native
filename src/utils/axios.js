import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com/todos/1', // Update the base URL for backend
  headers: {Authorization: ''}, // Update the headers for backend 

  
});

export default customFetch;