import { SEARCH_MAX_LENGTH } from "../constants/limits";

/**
 * Normaliza texto de busca: remove espaços extras e limita tamanho
 * (reduz risco de payloads enormes e URLs absurdas).
 */
export function sanitizeSearchQuery(raw) {
  if (typeof raw !== "string") return "";
  return raw.trim().slice(0, SEARCH_MAX_LENGTH);
}

/** Aceita apenas ids numéricos positivos vindos da URL */
export function parseProductId(param) {
  const id = Number.parseInt(String(param), 10);
  if (!Number.isFinite(id) || id <= 0) return null;
  return id;
}
