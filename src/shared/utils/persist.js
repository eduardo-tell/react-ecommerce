import { PERSIST_KEY } from "../constants/storage";

/**
 * Lê estado persistido com validação mínima de forma (arrays esperados).
 * Se o JSON estiver corrompido, retorna {} e não quebra o app.
 */
export function loadPersistedState() {
  try {
    const raw = localStorage.getItem(PERSIST_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};

    const safe = {};
    if (Array.isArray(parsed.cart)) safe.cart = parsed.cart;
    if (Array.isArray(parsed.favorites)) safe.favorites = parsed.favorites;
    if (Array.isArray(parsed.catalog)) safe.catalog = parsed.catalog;

    return safe;
  } catch {
    localStorage.removeItem(PERSIST_KEY);
    return {};
  }
}

export function savePersistedState(state) {
  try {
    const payload = {
      cart: state.cart,
      favorites: state.favorites,
      catalog: state.catalog,
    };
    localStorage.setItem(PERSIST_KEY, JSON.stringify(payload));
  } catch {
    /* quota excedida ou modo privado — ignora silenciosamente */
  }
}
