export const selectCartItems = (state) => state.cart;

export const selectCartCount = (state) => state.cart.length;

export const selectIsInCart = (state, productId) =>
  state.cart.some((item) => item.id === productId);

export const selectCartTotal = (state) =>
  state.cart.reduce(
    (sum, item) => sum + item.price * (item.quantity ?? 1),
    0
  );
