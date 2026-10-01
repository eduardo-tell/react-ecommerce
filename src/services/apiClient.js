import axios from "axios";
import { API_BASE_URL } from "../shared/constants/api";

/**
 * Cliente HTTP centralizado: base URL fixa e timeout para evitar requisições penduradas.
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 12_000,
  headers: { Accept: "application/json" },
});
