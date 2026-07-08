export const selectFavorites = state => state.favorites

export const selectIsProductFavorite = (state, productId) =>
  state.favorites.some(product => product.id === productId)

export const selectFavoritesCount = state => state.favorites.length
