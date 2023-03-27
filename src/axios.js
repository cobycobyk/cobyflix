import axios from 'axios';

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3"
});

export default instance;

// 1153793dc647b7581b0211c09102454e