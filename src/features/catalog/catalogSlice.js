import { createSlice } from "@reduxjs/toolkit";

/**
 * Catálogo exibido na home: preenchido após fetch.
 * Mantém apenas lista; não mistura com carrinho.
 */
const catalogSlice = createSlice({
  name: "catalog",
  initialState: [],
  reducers: {
    setCatalog(state, action) {
      const items = action.payload;
      if (!Array.isArray(items)) return;
      items.forEach((item) => {
        if (!state.some((p) => p.id === item.id)) state.push(item);
      });
    },
  },
});

export const { setCatalog } = catalogSlice.actions;
export default catalogSlice.reducer;
