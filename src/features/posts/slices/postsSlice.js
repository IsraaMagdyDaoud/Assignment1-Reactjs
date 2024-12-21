import { createSlice } from "@reduxjs/toolkit";
import {
  fetchPosts,
  addPost,
  updatePost,
  deletePost,
} from "../../../network/postsApis";

export const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
    error: null,
    loading: false,
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        // find the index of the post to be updated
        const postIndex = state.posts.findIndex(
          (post) => post.id === action.payload.id
        );

        // check if the post exists
        if (postIndex !== -1) {
          state.posts[postIndex] = action.payload;
        }
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      });
  },
});
export { fetchPosts, addPost, updatePost, deletePost };
export default postsSlice.reducer;
