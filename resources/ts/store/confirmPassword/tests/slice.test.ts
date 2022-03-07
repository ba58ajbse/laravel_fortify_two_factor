import { store } from '../../store';
import { setConfirmPasswordState } from '../slice';

describe('confirm password slice test', () => {
  it('confirm passwordの状態更新', () => {
    const initialState = store.getState().confirmPassword;
    const expected = { open: false, callback: undefined };
    expect(initialState).toEqual(expected);

    const testFunc = async (): Promise<void> => {
      console.log('test');
    };

    store.dispatch(setConfirmPasswordState({ open: true, callback: testFunc }));
    let state = store.getState().confirmPassword;
    expect(state.open).toBe(true);
    expect(state.callback).toEqual(testFunc);

    store.dispatch(setConfirmPasswordState({ open: false, callback: undefined }));
    state = store.getState().confirmPassword;
    expect(state.open).toBe(false);
    expect(state.callback).toEqual(undefined);
  });
});
