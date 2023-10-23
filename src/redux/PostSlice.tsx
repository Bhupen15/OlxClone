import { createSlice } from "@reduxjs/toolkit";


export const PostSlice = createSlice({
    name: "post",
    initialState: {
        data: []
    },
    reducers: {
        addPost(state: any, action) {
            state.data.push(action.payload);
        }
    }
})

export const { addPost  } = PostSlice.actions;
export default PostSlice.reducer;