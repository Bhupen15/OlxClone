import { createSlice } from "@reduxjs/toolkit";


export const WishlistSlice = createSlice({
    name: "wishlist",
    initialState: {
        data: []
    },
    reducers: {

        addToWishlist(state: any, action) {
            state.data.push(action.payload);

        },

        removeWishlist(state: any, action) {
          
            const NewData = state.data.filter((item: any) => {
                
                return item.name !== action.payload

            });

            state.data = NewData;

        }


    }
})

export const { addToWishlist, removeWishlist } = WishlistSlice.actions;
export default WishlistSlice.reducer;