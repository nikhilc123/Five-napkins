import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://react-burger-58cf2.firebaseio.com/'
});

export default instance;