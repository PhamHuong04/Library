import { IUser, IUserRegister } from "../../utils/interfaces";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSelector } from "reselect";
import { RootState } from "../store";
import axiosInstance from "../../service/config";

export const typeUserAction = {
  REGISTER_USER: "user/REGISTER_USER",
  LOGIN_USER: "user/LOGIN",
  GET_PROFILE: "user/PROFILE",
};


interface UserState {
  success: boolean;
  loading: boolean;
  error: boolean;
  user: IUser | null;
  currentUser: IUser | null;
}

export const registerUser = createAsyncThunk<IUser, IUserRegister>(
  typeUserAction.REGISTER_USER,
  async (user) => {
    try {
      const response = await axiosInstance.post(`/user/register`, user);
      return response.data;
    } catch (error) {}
  }
);

export const loginUser = createAsyncThunk<
  string,
  { email: string; password: string }
>(typeUserAction.LOGIN_USER, async (user) => {
  try {
    const response = await axiosInstance.post(`/auth/signin`, user);
    return response.data;
  } catch (error) {}
});

export const getProfilUser = createAsyncThunk<IUser>(
  typeUserAction.GET_PROFILE,
  async () => {
    try {
      const response = await axiosInstance.post(`/user/profile`);
      return response.data;
    } catch (error) {}
  }
);

const initialState: UserState = {
  success: false,
  currentUser: null,
  user: null,
  loading: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signOut: (state) => {
      state.currentUser = null;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      registerUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.user = action.payload;
        state.success = true;
      }
    );
    builder.addCase(registerUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      loginUser.fulfilled,
      (state, action: PayloadAction<string>) => {
        state.loading = false;
        localStorage.setItem("accessToken", action.payload);        
        state.success = true;
      }
    );
    builder.addCase(loginUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
    builder.addCase(getProfilUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      getProfilUser.fulfilled,
      (state, action: PayloadAction<IUser>) => {
        state.loading = false;
        state.currentUser = action.payload;
        state.success = true;
      }
    );
    builder.addCase(getProfilUser.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});
export const { signOut } = userSlice.actions;
export const selectUserState = (state: RootState) => state.user;

export const selectSuccessStatus = createSelector(
  selectUserState,
  (state) => state.success
);

export const selectErrorStatus = createSelector(
  selectUserState,
  (state) => state.error
);

export const selectUserRegister = createSelector(
  selectUserState,  
  (state) => state.user
);

export const selectCurrentUser = createSelector(
  selectUserState,
  (state) => state.currentUser
);

export default userSlice.reducer;
