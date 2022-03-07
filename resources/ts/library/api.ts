import axios, { AxiosError, AxiosResponse } from 'axios';

const Axios = axios.create({ withCredentials: true });

const onSuccess = (response: AxiosResponse) => response;

const onError = (error: AxiosError) => {
  console.log(error);
};

Axios.interceptors.response.use(onSuccess, onError);

// Axios.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     switch (error.response?.status) {
//       case 400:
//       case 401:
//         console.log(error.response);
//         break;
//       case 404:
//         console.log('not found');
//         break;
//       case 422:
//         console.log('unprocessible content');
//         return { status: error.response.status, msg: 'unprocessible content' };
//       // break;
//       case 500:
//         return false;
//       default:
//         console.log('default error');
//     }
//   }
// );

export default Axios;
