import axios from "axios";

const API_GATEWAY_URL = "http://localhost:8080";

export const login = async (email, password) => {
  const response = await axios.post(`${API_GATEWAY_URL}/auth/login`, { email, password });
  return response.data;
};

export const fetchProducts = async () => {
  const response = await axios.get(`${API_GATEWAY_URL}/products`);
  return response.data;
};
