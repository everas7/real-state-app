import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { logout } from '../../features/access/services/accessSlice';
import { Store } from '../store/store';

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || 'http://localhost:7000/api';

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

const sleep = (ms: number) => (response: AxiosResponse) =>
  new Promise<AxiosResponse>((resolve) =>
    setTimeout(() => resolve(response), ms)
  );

const responseBody = (response: AxiosResponse) => response.data;

const request = {
  get: (url: string, params?: URLSearchParams) => {
    return axios.get(url, { params }).then(sleep(1000)).then(responseBody);
  },
  getPaginated: (url: string, params?: URLSearchParams) => {
    return axios
      .get(url, { params })
      .then(sleep(1000))
      .then((response) => ({
        data: response.data,
        pages: response.headers['total-pages'],
      }));
  },
  post: (url: string, body: {}) =>
    axios.post(url, body).then(sleep(1000)).then(responseBody),
  put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
  patch: (url: string, body: {}) => axios.patch(url, body).then(responseBody),
  del: (url: string, params?: URLSearchParams) =>
    axios.delete(url, { params }).then(responseBody),
  postForm: (url: string, formData: FormData) => {
    return axios
      .post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then(responseBody);
  },
};

export { request };
