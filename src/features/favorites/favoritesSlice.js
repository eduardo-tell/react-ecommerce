import { createSlice } from "@reduxjs/toolkit";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      const product = action.payload;
      if (!product?.id) return;

      const index = state.findIndex((f) => f.id === product.id);
      if (index === -1) {
        state.push(product);
      } else {
        state.splice(index, 1);
      }
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
