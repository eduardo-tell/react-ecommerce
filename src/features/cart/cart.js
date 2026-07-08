import { createSlice } from '@reduxjs/toolkit';

const cart = createSlice({
  name: 'cartProducts',
  initialState: [],
  reducers: {
    toggleCartProduct(state, action) {
      if (!action.payload) return

      const index = state.findIndex(product => product.id === action.payload.id)

      if (index === -1) {
        state.push({ ...action.payload, quantity: 1 })
      } else {
        state.splice(index, 1)
      }
    },
  }
})

export const { toggleCartProduct } = cart.actions
export default cart.reducer
