import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/product";
import cartReducer from "./cart/cart";
// import categoryReducer from "./category/category";
import userReducer from "./user/user";
import commentReducer from "./comment/comment";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    // category: categoryReducer,
    user: userReducer,
    comment: commentReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
