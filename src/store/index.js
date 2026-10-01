import { configureStore } from "@reduxjs/toolkit";
import catalogReducer from "../features/catalog/catalogSlice";
import cartReducer from "../features/cart/cartSlice";
import favoritesReducer from "../features/favorites/favoritesSlice";
import { loadPersistedState, savePersistedState } from "../shared/utils/persist";

/** Grava apenas fatias necessárias após cada action */
const persistMiddleware = (storeApi) => (next) => (action) => {
  const result = next(action);
  savePersistedState(storeApi.getState());
  return result;
};

const store = configureStore({
  reducer: {
    catalog: catalogReducer,
    cart: cartReducer,
    favorites: favoritesReducer,
  },
  preloadedState: loadPersistedState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistMiddleware),
});

export default store;
