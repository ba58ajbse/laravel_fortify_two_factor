import { store } from '../../store';
import { setAuthState, setAuthTwoFAState } from '../slice';

describe('auth slice test', () => {
  it('認証情報の更新', () => {
    const initialState = store.getState().auth;
    const expected = { auth: false, name: '', email: '', enable_two_factor: false };
    expect(initialState).toEqual(expected);

    store.dispatch(setAuthState({ auth: true }));
    let state = store.getState().auth;
    expect(state.auth).toBe(true);

    store.dispatch(setAuthState({ auth: false }));
    state = store.getState().auth;
    expect(state.auth).toBe(false);
  });

  it('2段階認証使用状況の更新', () => {
    const initialState = store.getState().auth;
    const expected = { auth: false, name: '', email: '', enable_two_factor: false };
    expect(initialState).toEqual(expected);

    store.dispatch(setAuthTwoFAState({ enable_two_factor: true }));
    let state = store.getState().auth;
    expect(state.enable_two_factor).toBe(true);

    store.dispatch(setAuthTwoFAState({ enable_two_factor: false }));
    state = store.getState().auth;
    expect(state.enable_two_factor).toBe(false);
  });
});
