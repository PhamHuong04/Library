import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./product/product";
import cartReducer from "./cart/cart";
// import categoryReducer from "./category/category";
import userReducer from "./user/user";

export const store = configureStore({
  reducer: {
    product: productReducer,
    cart: cartReducer,
    // category: categoryReducer,
    user: userReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
