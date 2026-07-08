export const selectCartItems = state => state.cartProducts

export const selectIsProductInCart = (state, productId) =>
  state.cartProducts.some(product => product.id === productId)

export const selectCartItemsCount = state => state.cartProducts.length

export const selectCartTotal = state =>
  state.cartProducts.reduce((total, item) => total + item.price * item.quantity, 0)
