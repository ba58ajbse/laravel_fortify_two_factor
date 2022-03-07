import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';
import { AuthType, AuthResponseType } from './type';

const initialState: AuthType = { auth: false, name: '', email: '', enable_two_factor: false };

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthState(state, action: PayloadAction<Pick<AuthType, 'auth'>>) {
      state.auth = action.payload.auth;

      return state;
    },
    setAuthTwoFAState(state, action: PayloadAction<Pick<AuthType, 'enable_two_factor'>>) {
      state.enable_two_factor = action.payload.enable_two_factor;

      return state;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      api.endpoints.getAuthUser.matchFulfilled,
      (state, action: PayloadAction<AuthResponseType>) => {
        const { name, email, two_factor_secret } = action.payload;
        state.auth = true;
        state.name = name;
        state.email = email;
        state.enable_two_factor = two_factor_secret ? true : false;
      }
    );
  },
});

export const { setAuthState, setAuthTwoFAState } = authSlice.actions;

export default authSlice.reducer;
