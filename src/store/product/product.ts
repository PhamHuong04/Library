import { IBook } from "../../utils/interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../store";
import axiosInstance from "../../service/config";

export const typeProductAction = {
  GET_ALL_PRODUCT: "product/GET_ALL_PRODUCT",
  GET_PRODUCT: "product/GET_PRODUCT",
  ADD_BOOK: "product/ADD_BOOK",
};

interface ProductState {
  products: IBook[];
  product: IBook | null;
  loading: boolean;
  error: boolean;
  search: string;
}

export const getAllProduct = createAsyncThunk<
  IBook[]
>(typeProductAction.GET_ALL_PRODUCT, async () => {
  try {
    const response = await axiosInstance.get("/book/");
    return response.data;
  } catch (error) {}
});

export const getProduct = createAsyncThunk<IBook, string>(
  typeProductAction.GET_PRODUCT,
  async (uuid) => {
    try {
      const response = await axiosInstance.get(`/book/${uuid}/`);
      return response.data;
    } catch (error) {}
  }
);

export const addBook = createAsyncThunk<any, any>(
  typeProductAction.ADD_BOOK,
  async (product) => {
    try {
      const response = await axiosInstance.post("/book/", product);
      return response;
    } catch (error) {}
  }
);


const initialState: ProductState = {
  products: [],
  search: "",
  loading: false,
  error: false,
  product: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
    });
    builder.addCase(getAllProduct.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(getProduct.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(getProduct.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });

    builder.addCase(addBook.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addBook.fulfilled, (state, action) => {
      state.loading = false;
      state.product = action.payload;
    });
    builder.addCase(addBook.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const { updateFilter } = productSlice.actions;

export const selectProductState = (state: RootState) => state.product;
export const selectProducts = createSelector(
  selectProductState,
  (products) => products.products
);

export const selectProductSearch = createSelector(
  selectProductState,
  (state) => state.search
);

export const selectProductDetail = createSelector(
  selectProductState,
  (state) => state.product
);

export default productSlice.reducer;
