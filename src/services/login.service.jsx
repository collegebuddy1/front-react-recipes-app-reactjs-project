import axios from 'axios';

const baseUrl = import.meta.env.VITE_BACKEND_URL;

export const login = (data) => {

return axios.post(baseUrl + "/auth/login", data).then(response => {
    // Almacenar el token y el nombre del usuario en el almacenamiento local
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('name', response.data.name);
    return response;
  });
};
