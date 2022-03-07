import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { AuthType } from './type';

export const selectAuth = (state: RootState) => state.auth;

/**
 * 認証状態の取得
 */
export const selectAuthenticated = createSelector(
  selectAuth,
  (authState: AuthType) => authState.auth
);

/**
 * 2段階認証利用状況の取得
 */
export const selectAuthTFAState = createSelector(
  selectAuth,
  (authState: AuthType) => authState.enable_two_factor
);
