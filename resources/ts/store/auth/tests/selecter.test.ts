import { selectAuthenticated, selectAuthTFAState } from '../selector';
import { AuthType } from '../type';

const initialState: AuthType = {
  auth: false,
  name: '',
  email: '',
  enable_two_factor: false,
};

describe('auth selector', () => {
  it('selector to get selected authenticated from auth state', () => {
    const selected = selectAuthenticated.resultFunc(initialState);
    expect(selected).toEqual(false);
  });

  it('selector to get selected 2FA state from auth state', () => {
    const selected = selectAuthTFAState.resultFunc(initialState);
    expect(selected).toEqual(false);
  });
});
