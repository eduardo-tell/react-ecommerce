/** Rotas nomeadas — evita strings duplicadas no app */
export const ROUTES = {
  home: "/",
  product: (id) => `/produto/${id}`,
  favorites: "/favoritos",
  search: (query) => `/busca?search=${encodeURIComponent(query)}`,
  checkout: "/checkout",
};
