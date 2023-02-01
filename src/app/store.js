import { configureStore } from "@reduxjs/toolkit";
import quizSliceReducer from "./todoSlice";
import authSliceReducer from "./authSlice.";

export const store = configureStore({
    reducer: {
        quiz: quizSliceReducer,
        auth: authSliceReducer
    }
})