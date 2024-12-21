import { configureStore } from "@reduxjs/toolkit";
import postsSlice from "../features/posts/slices/postsSlice"
export default configureStore({
    reducer: {
     postsData: postsSlice
    }
})