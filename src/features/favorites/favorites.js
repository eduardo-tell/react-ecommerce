import { createSlice } from '@reduxjs/toolkit';

const favorites = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {
    toggleFavorite(state, action) {
      if (!action.payload) return

      const index = state.findIndex(favorite => favorite.id === action.payload.id)

      if (index === -1) {
        state.push(action.payload)
      } else {
        state.splice(index, 1)
      }
    }
  }
})

export const { toggleFavorite } = favorites.actions
export default favorites.reducer
