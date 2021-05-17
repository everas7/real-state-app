import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../../features/access/services/accessSlice';
import { Store } from '../store/store';

axios.defaults.baseURL = process.env.REACT_APP_API_URL || 'http://localhost:7000/api';

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('jwt');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export const setupAxiosResponseInterceptor = (store: Store) => {
  axios.interceptors.response.use(undefined, (error) => {
    if (error.message === 'Network Error' && !error.response) {
      toast.error(
        'Network Error. Please try again or check your internet connection!'
      );
    } else {
      const { status, headers } = error.response;
      if (
        status === 401 &&
        headers['authentication-error']?.includes('Invalid token')
      ) {
        toast.info('Your session has expired, please login again');
        store.dispatch(logout());
      }

      if (status === 500) {
        toast.error('Server Error - Contact system administrator');
      }
    }

    throw error.response;
  });
};

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string, params?: URLSearchParams) => {
    return axios.get(url, { params }).then(responseBody);
  },
  post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  del: (url: string) => axios.delete(url).then(responseBody),
  postForm: (url: string, file: Blob) => {
    const formData = new FormData();
    formData.append('File', file);
    return axios
      .post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(responseBody);
  },
};

export { request };
