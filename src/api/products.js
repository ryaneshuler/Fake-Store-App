import axios from 'axios';

export async function fetchProducts() {
  const res = await axios.get('https://fakestoreapi.com/products');
  return res.data;
}

export async function fetchProductById(id) {
  const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
  return res.data;
}