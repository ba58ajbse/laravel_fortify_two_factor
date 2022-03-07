import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { api } from './api';
import auhtReducer from './auth/slice';
import confirmPasswordReducer from './confirmPassword/slice';
import errorReducer from './error/slice';

export const store = configureStore({
  reducer: {
    auth: auhtReducer,
    confirmPassword: confirmPasswordReducer,
    error: errorReducer,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['confirmPassword/setConfirmPasswordState'],
        ignoredPaths: ['confirmPassword.callback'],
      },
    }),
    api.middleware,
  ],
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
