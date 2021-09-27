import axios from 'axios';

const client = {
  get: (url, ...args) => axios.get(url, ...args),
  post: (url, ...args) => axios.post(url, ...args)
}

export default client;
