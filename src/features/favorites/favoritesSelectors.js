export const selectFavorites = (state) => state.favorites;

export const selectFavoritesCount = (state) => state.favorites.length;

export const selectIsFavorite = (state, productId) =>
  state.favorites.some((item) => item.id === productId);
