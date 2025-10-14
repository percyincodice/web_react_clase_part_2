import axios from 'axios';
import Swal from 'sweetalert2';

const api = axios.create({
  baseURL: 'http://127.0.0.1:5000/api',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    config.headers['ngrok-skip-browser-warning'] = 'true';
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      Swal.fire({
        icon: 'warning',
        title: 'Sesion expirada',
        text: 'Por favor inicie sesion para continuar.',
        confirmButtonText: 'OK',
      }).then((resultMessage) => {        
        localStorage.removeItem('token');
        if (resultMessage.isConfirmed) {
            window.location.href = '/login';
        }        
      });
    }
    return Promise.reject(error);
  }
);

export default api;
