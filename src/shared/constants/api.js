/** Única origem de dados externa permitida pela camada de serviços */
export const API_BASE_URL = "https://dummyjson.com";

export const API_ENDPOINTS = {
  products: (limit = 12) => `/products?limit=${limit}`,
  productById: (id) => `/products/${id}`,
  search: (query, limit = 20) =>
    `/products/search?q=${encodeURIComponent(query)}&limit=${limit}`,
};
