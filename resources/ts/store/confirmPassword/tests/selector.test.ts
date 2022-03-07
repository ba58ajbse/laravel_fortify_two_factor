import { selectConfirmPasswordCallback, selectConfirmPasswordOpen } from '../selector';
import { ConfirmPasswordType } from '../type';

const initialState: ConfirmPasswordType = {
  open: false,
  callback: undefined,
};

describe('confirm password selector', () => {
  it('パスワード確認画面表示有無の状態取得テスト', () => {
    const selected = selectConfirmPasswordOpen.resultFunc(initialState);
    expect(selected).toEqual(false);
  });

  it('バスワード確認後コールバック関数の状態取得テスト', () => {
    const selected = selectConfirmPasswordCallback.resultFunc(initialState);
    expect(selected).toEqual(undefined);
  });
});
