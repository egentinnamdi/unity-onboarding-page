import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService } from "@/services/api/auth";
import { RouterConstantUtil } from "@/utils/constants/RouterConstantUtils";
import { handleReqResErrors, handleToastNotifs } from "@/utils/helpers";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface IAuthData {
  [key: string]: any;
}

interface IinitialState {
  logginIn: boolean;
  logginOut: boolean;
  pwdResetDetails?: Record<string, string>;
  loginRejectedError: ICustomError | null;
  u_data: IAuthData | null | Record<string, string | Record<string, string>>;
}

const initialState: IinitialState = {
  logginIn: false,
  logginOut: false,
  pwdResetDetails: {},
  loginRejectedError: null,
  u_data: null,
};

const handleLoginResponse = (state: any, action: any) => {
  state.u_data = {
    accessToken: action.payload.token,
  };

  handleToastNotifs({
    type: "success",
    id: "error",
    duration: 4000,
    message: "Successfully Logged In",
  });

  state.logginIn = false;
  window.location.href = RouterConstantUtil.admin.home;
};

const action = {
  login: createAsyncThunk(
    "auth/login",
    async (data: ILogin, { rejectWithValue }) => {
      try {
        const response = await AuthService.login(data);
        return response.data;
      } catch (e) {
        return rejectWithValue(e);
      }
    }
  ),

  logout: createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
      const response = await AuthService.logout();
      return response.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateUserData(state: any, action) {
      state.u_data.user = { ...state.u_data.user, ...action.payload };
    },
    clearLoginRejectedError: (state) => {
      state.loginRejectedError = null;
    },
    updateToken: (state, action: PayloadAction<string>) => {
      if (state.u_data) {
        state.u_data.accessToken = action.payload;
      }
    },
    updatePwdResetDetails: (
      state,
      action: PayloadAction<Record<string, string>>
    ) => {
      state.pwdResetDetails = { ...state.pwdResetDetails, ...action.payload };
    },
    clearPwdResetDetails: (state) => {
      state.pwdResetDetails = {};
    },
    resetAuthState: () => {
      return { ...initialState };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(action.login.pending, (state) => {
        state.logginIn = true;
      })
      .addCase(action.login.fulfilled, handleLoginResponse)

      .addCase(action.login.rejected, (state, action) => {
        state.logginIn = false;

        const err = action.payload as ICustomError;

        handleReqResErrors(err);
      })
      .addCase(action.logout.pending, (state) => {
        state.logginOut = true;
      })
      .addCase(action.logout.fulfilled, (state) => {
        state.logginIn = initialState.logginIn;
        state.logginOut = initialState.logginOut;
        state.loginRejectedError = initialState.loginRejectedError;
        state.u_data = initialState.u_data;
      })
      .addCase(action.logout.rejected, (state) => {
        state.logginOut = false;
        // persistor.purge();
      });
  },
});

export const { login, logout } = action;
export const {
  updateToken,
  resetAuthState,
  updateUserData,
  updatePwdResetDetails,
  clearPwdResetDetails,
} = authSlice.actions;
export const authReducer = authSlice.reducer;
