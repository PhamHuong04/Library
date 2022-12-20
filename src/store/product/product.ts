import { IBook } from "../../utils/interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../store";
import axiosInstance from "../../service/config";

export const typeProductAction = {
  GET_ALL_PRODUCT: "product/GET_ALL_PRODUCT",
  GET_PRODUCT: "product/GET_PRODUCT",
};

interface ProductListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IBook[];
}
interface ProductState {
  products: IBook[];
  product: IBook | null;
  loading: boolean;
  error: boolean;
  search: string;
}

export const getAllProduct = createAsyncThunk<
  IBook[],
  { limit: number | null; offset: number | null }
>(typeProductAction.GET_ALL_PRODUCT, async ({ limit, offset }) => {
  try {
    let query = "?";
    if (limit) {
      query += "limit=" + limit + "&";
    }
    if (offset) {
      query += "offset=" + offset + "&";
    }
    const response = await axiosInstance.get("/book/" + query);
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
      //   state.products.count = action.payload.count;
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
// export const selectNextPageProduct = createSelector(
//   selectProducts,
//   (products) => products.next
// );
// export const selectPrevPageProduct = createSelector(
//   selectProducts,
//   (products) => products.previous
// );
// export const selectProductList = createSelector(
//   selectProducts,
//   (state) => state.results
// );

export const selectProductDetail = createSelector(
  selectProductState,
  (state) => state.product
);

// export const selectProductCount = createSelector(
//   selectProducts,
//   (state) => state.count
// );

export default productSlice.reducer;
