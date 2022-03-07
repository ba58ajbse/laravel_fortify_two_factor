import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type ErrorType = {
  response: unknown;
};

const initialState = {} as ErrorType;

const errorSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError(state, action: PayloadAction<ErrorType>) {
      state = action.payload;
      return state;
    },
  },
});

export const { setError } = errorSlice.actions;

export default errorSlice.reducer;
