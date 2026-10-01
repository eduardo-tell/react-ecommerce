import { API_ENDPOINTS } from "../shared/constants/api";
import { sanitizeSearchQuery } from "../shared/utils/sanitize";
import { apiClient } from "./apiClient";

/** Busca lista inicial de produtos para a vitrine */
export async function fetchProductList(limit = 12) {
  const { data } = await apiClient.get(API_ENDPOINTS.products(limit));
  return data.products ?? [];
}

/** Detalhe de um produto por id */
export async function fetchProductById(id) {
  const { data } = await apiClient.get(API_ENDPOINTS.productById(id));
  return data;
}

/** Busca por termo (retorna array vazio se termo inválido) */
export async function searchProducts(query, limit = 20) {
  const term = sanitizeSearchQuery(query);
  if (term.length === 0) return [];

  const { data } = await apiClient.get(API_ENDPOINTS.search(term, limit));
  return data.products ?? [];
}
