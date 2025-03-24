// import axios from 'axios';

// const instance = axios.create({
//     baseURL: 'http://localhost:8080/api/v1', 
//     headers: {
//         'Content-Type': 'application/json',
//     },
// });

// const setAuthToken = (token) => {
//     if (token) {
//         localStorage.setItem('authToken', token);
        
//         instance.defaults.headers['Authorization'] = `Bearer ${token}`;
//     } else {
//         localStorage.removeItem('authToken');
        
//         delete instance.defaults.headers['Authorization'];
//     }
// };

// export { instance, setAuthToken };

import axios from "axios";


const instance = axios.create({
  baseURL: 'http://192.168.213.184:8080',
    timeout: 5000,
    // headers: {Authorization: `Bearer ${token}`}
  });
  export default instance;
