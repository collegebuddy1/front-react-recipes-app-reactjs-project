import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

const getToken = () => {
  return localStorage.getItem("token");
};

export const postRecipe = (data) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return axios.post(baseUrl + "/recipes", data, config);
};

export const getRecipe = (data) => {
  return axios.get(baseUrl + "/recipes", data);
};

export const getRecipeById = (id) => {
  return axios.get(baseUrl + "/recipes/" + id);
};

export const getRecipeByTitle = (title) => {
  return axios.get(baseUrl + "/recipes/search/" + title);
};

export const deleteRecipe = (id) => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return axios.delete(baseUrl + "/recipes/" + id, config);
};

export const getmyRecipe = () => {
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return axios.get(baseUrl + "/myRecipes", config);
};

export const editRecipe = (id, data) => {
  console.log(data)
  const config = {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  };
  return axios.put(baseUrl + "/recipes/" + id, data, config);
};
