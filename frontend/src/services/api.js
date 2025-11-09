import axios from 'axios';

// const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';
// const API_BASE_URL = '/api';
const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getProducts = async () => {
  const response = await api.get('/products');
  console.log("res:", response);
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

export const getEMIPlans = async (productId) => {
  const response = await api.get(`/emi-plans/${productId}`);
  return response.data;
};

export default api;
