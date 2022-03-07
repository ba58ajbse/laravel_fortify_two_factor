import { useDispatch } from 'react-redux';
import { setConfirmPasswordState } from '../../../store/confirmPassword/slice';
import useAuth from '../useAuth';

const useConfirmPassword = () => {
  const { getConfirmedPasswordStatus, postConfirmPassword } = useAuth();
  const dispatch = useDispatch();
  /**
   * パスワードの確認が必要かどうか検証
   * 必要であればtrue, 必要なければfalseを返す
   *
   * @returns Promise<boolean>
   */
  const checkConfirmPasswordStatus = async (): Promise<boolean> => {
    const confirmed = await getConfirmedPasswordStatus();

    return confirmed;
  };

  /**
   * 確認用のパスワードを送信し、検証結果を返す
   *
   * @param password string
   * @returns Promise<boolean>
   */
  const confirmPassword = async (password: string): Promise<boolean> => {
    const status = await postConfirmPassword(password);

    return status;
  };

  /**
   * 画面の終了
   *
   * @returns void
   */
  const close = () => {
    dispatch(setConfirmPasswordState({ open: false, callback: undefined }));
  };

  return { checkConfirmPasswordStatus, confirmPassword, close };
};

export default useConfirmPassword;
