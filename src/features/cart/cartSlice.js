import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    toggleCartItem(state, action) {
      const product = action.payload;
      if (!product?.id) return;

      const index = state.findIndex((item) => item.id === product.id);
      if (index === -1) {
        state.push({
          id: product.id,
          title: product.title,
          price: product.price,
          thumbnail: product.thumbnail,
          description: product.description,
          quantity: 1,
        });
      } else {
        state.splice(index, 1);
      }
    },
    clearCart() {
      return [];
    },
  },
});

export const { toggleCartItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
