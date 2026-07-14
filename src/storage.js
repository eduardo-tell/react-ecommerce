import { configureStore } from "@reduxjs/toolkit"
import productsReducer from "./features/products/products"
import favoritesReducer from "./features/favorites/favorites"
import cartProductsReducer from "./features/cart/cart"

// import { supabase } from "../lib/supabase";

const localStorageMiddleware = store => next => action => {
  const result = next(action)
  localStorage.setItem('myReduxState', JSON.stringify(store.getState()))
  return result
}

const persistedState = localStorage.getItem('myReduxState') ? JSON.parse(localStorage.getItem('myReduxState')) : {}

const store = configureStore({
  reducer: {
    products: productsReducer,
    cartProducts: cartProductsReducer,
    favorites: favoritesReducer
  },  
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(localStorageMiddleware),
  preloadedState: persistedState,
})

export default store

// export const gerenciadorDeProdutos = createAsyncThunk(
//   'gerenciadorDeProdutos',
//   async () => {
//     const { data, error } = await supabase
//       .from('produtos')
//       .select('*');

//       if (error) {
//         throw new Error(error.message);
//       }
//       return data;
// });

// extraReducers: (builder) => {
//   builder
//     .addCase(gerenciadorDeProdutos.pending, (state) => {
//       state.status = 'loading';
//     })
//     .addCase(gerenciadorDeProdutos.fulfilled, (state, action) => {
//       state.status = 'succeeded';
//       state.products = action.payload;
//     })
//     .addCase(gerenciadorDeProdutos.rejected, (state, action) => {
//       state.status = 'failed';
//       state.error = action.error.message;
//     });
// }