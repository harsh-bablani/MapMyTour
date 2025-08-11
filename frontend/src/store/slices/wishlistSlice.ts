import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface WishlistState {
  tourIds: string[];
}

const initialState: WishlistState = {
  tourIds: JSON.parse(localStorage.getItem('wishlist') || '[]'),
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState,
  reducers: {
    addToWishlist: (state, action: PayloadAction<string>) => {
      if (!state.tourIds.includes(action.payload)) {
        state.tourIds.push(action.payload);
        localStorage.setItem('wishlist', JSON.stringify(state.tourIds));
      }
    },
    removeFromWishlist: (state, action: PayloadAction<string>) => {
      state.tourIds = state.tourIds.filter(id => id !== action.payload);
      localStorage.setItem('wishlist', JSON.stringify(state.tourIds));
    },
    toggleWishlist: (state, action: PayloadAction<string>) => {
      const index = state.tourIds.indexOf(action.payload);
      if (index > -1) {
        state.tourIds.splice(index, 1);
      } else {
        state.tourIds.push(action.payload);
      }
      localStorage.setItem('wishlist', JSON.stringify(state.tourIds));
    },
  },
});

export const { addToWishlist, removeFromWishlist, toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
