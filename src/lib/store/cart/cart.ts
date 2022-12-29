import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { IBook, ICartItem } from "../../utils/interface";
import { RootState } from "../store";

export const typeCartAction = {
  ADD_TO_CART: "cart/addItemToCart",
  REMOVE_TO_CART: "cart/removeItemToCart",
  CLEAR_ITEM_IN_CART: "cart/clearItemInCart",
};

interface CartState {
  cartItems: ICartItem[];
}

export const getCartItemsFromLS = () => {
  const items = localStorage.getItem("cartItems");
  if (items === null) {
    return [];
  } else {
    let cartItems = JSON.parse(items) as ICartItem[];
    return cartItems;
  }
};

export const setCartItemsToLocalStorage = (
  cartItems: {
    product: IBook;
    quantity: number;
  }[]
) => {
  localStorage.setItem("cartItems", JSON.stringify(cartItems));
};

const initialState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    initialCartItems(state) {
      const cartItems = getCartItemsFromLS();
      state.cartItems = cartItems;
    },
    addItemToCart(state, action: PayloadAction<{ product: IBook }>) {
      const { product } = action.payload;
      const cartItems = state.cartItems;
      const idex = state.cartItems.findIndex(
        (item) => item.product.bookcode === product.bookcode
      );
      if (idex >= 0) {
        cartItems[idex].quantity += 1;
      } else {
        cartItems.push({ product, quantity: 1 });
      }
      setCartItemsToLocalStorage(cartItems);
      state.cartItems = cartItems;
    },
    removeItemToCart(state, action: PayloadAction<{ product: IBook }>) {
      const { product } = action.payload;
      const cartItems = state.cartItems;
      const idex = state.cartItems.findIndex(
        (item) => item.product.bookcode === product.bookcode
      );
      if (cartItems[idex].quantity === 1) {
        cartItems.splice(idex, 1);
      } else {
        cartItems[idex].quantity -= 1;
      }
      setCartItemsToLocalStorage(cartItems);
      state.cartItems = cartItems;
    },
    clearItemToCart(state, action: PayloadAction<{ product: IBook }>) {
      const { product } = action.payload;
      const cartItems = state.cartItems;
      const idex = state.cartItems.findIndex(
        (item) => item.product.bookcode === product.bookcode
      );
      cartItems.splice(idex, 1);
      setCartItemsToLocalStorage(cartItems);
      state.cartItems = cartItems;
    },
  },
});

export const selectCartState = (state: RootState) => state.cart;

export const selectCartItems = createSelector(
  selectCartState,
  (state) => state.cartItems
);

export const selectTotalMoney = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce(
    (total, cartItem) => total + cartItem.product.price * cartItem.quantity,
    0
  )
);

export const selectTotalItem = createSelector(selectCartItems, (cartItems) =>
  cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
);

export const {
  addItemToCart,
  removeItemToCart,
  clearItemToCart,
  initialCartItems,
} = cartSlice.actions;

export default cartSlice.reducer;
