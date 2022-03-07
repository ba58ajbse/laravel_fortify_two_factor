import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ConfirmPasswordType } from './type';

export const selectConfirmPassword = (state: RootState) => state.confirmPassword;

/**
 * バスワード確認画面表示有無の取得
 */
export const selectConfirmPasswordOpen = createSelector(
  selectConfirmPassword,
  (state: ConfirmPasswordType) => state.open
);

/**
 * パスワード確認後のコールバック関数取得
 */
export const selectConfirmPasswordCallback = createSelector(
  selectConfirmPassword,
  (state: ConfirmPasswordType) => state.callback
);
