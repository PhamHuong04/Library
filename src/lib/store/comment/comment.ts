import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { IComment } from "../../utils/interface/comment";
import axiosInstance from "../../../service/config";
import { RootState } from "../store";

export const typeProductAction = {
  GET_COMMENT: "comment/GET_COMMENT",
};

interface CommentState {
  comments: IComment[];
  comment: IComment | null;
  loading: boolean;
  error: boolean;
  search: string;
}

export const getAllComment = createAsyncThunk<IComment[]>(
  typeProductAction.GET_COMMENT,
  async () => {
    try {
      const response = await axiosInstance.get("/comment/");
      return response.data;
    } catch (error) {}
  }
);

const initialState: CommentState = {
  comments: [],
  search: "",
  loading: false,
  error: false,
  comment: null,
};

export const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    updateFilter(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllComment.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllComment.fulfilled, (state, action) => {
      state.loading = false;
      state.comments = action.payload;
    });
    builder.addCase(getAllComment.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { updateFilter } = commentSlice.actions;

export const selectCommentState = (state: RootState) => state.comment;
export const selectCommnets = createSelector(
  selectCommentState,
  (comments) => comments.comments
);

export default commentSlice.reducer;
