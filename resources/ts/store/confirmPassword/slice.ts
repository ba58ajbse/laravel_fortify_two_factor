import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ConfirmPasswordType } from './type';

const initialState: ConfirmPasswordType = { open: false, callback: undefined };

export const confirmPasswordSlice = createSlice({
  name: 'confirmPassword',
  initialState,
  reducers: {
    setConfirmPasswordState(state, action: PayloadAction<ConfirmPasswordType>) {
      state.open = action.payload.open;
      state.callback = action.payload.callback;

      return state;
    },
  },
});

export const { setConfirmPasswordState } = confirmPasswordSlice.actions;

export default confirmPasswordSlice.reducer;
