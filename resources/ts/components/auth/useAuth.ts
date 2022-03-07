import { useDispatch } from 'react-redux';
import Axios from '../../library/api';
import { setAuthState } from '../../store/auth/slice';

type LoginResponseType = 'login' | 'two_factor' | 'error';
type TwoFAChallengeType = 'code' | 'recovery_code';

const useAuth = () => {
  const dispatch = useDispatch();

  /**
   * ログイン処理
   * 2段階認証の利用状況を判定して返す
   *
   * @param email string
   * @param password string
   * @returns Promise<LoginResponseType>
   */
  const login = async (email: string, password: string): Promise<LoginResponseType> => {
    const res = await Axios.post('/login', { email, password }).then((res) => res);

    if (res.status === 200 && res.data.two_factor) {
      return 'two_factor';
    }
    if (!res.data.two_factor) {
      return 'login';
    }

    return 'error';
  };

  /**
   * ログアウト処理
   */
  const logout = async (): Promise<boolean> => {
    const res = await Axios.post('/logout').then((res) => res);

    if (res.status === 204) {
      dispatch(setAuthState({ auth: false }));
      return true;
    }

    return false;
  };

  /**
   * QRコード取得（svg要素をstring型で受け取る）
   *
   * @returns string
   */
  const getQrCode = async (): Promise<string> => {
    const qrCode = await Axios.get('user/two-factor-qr-code').then((res) => res.data.svg);

    return qrCode;
  };

  /**
   * 2段階認証用のリカバリーコードの取得
   *
   * @returns string
   */
  const getRecoveryCodes = async (): Promise<string[]> => {
    const codes = await Axios.get('user/two-factor-recovery-codes').then((res) => res.data);

    return codes;
  };

  /**
   * 2段階認証の有効化
   *
   * @returns boolean
   */
  const enableTwoFA = async (): Promise<boolean> => {
    const res = await Axios.post('user/two-factor-authentication', {}).then((res) => res);

    return res?.status === 200 ? true : false;
  };

  /**
   * 2段階認証の無効化
   *
   * @returns boolean
   */
  const disableTwoFA = async (): Promise<boolean> => {
    const res = await Axios.delete('user/two-factor-authentication').then((res) => res);

    return res.status === 200 ? true : false;
  };

  /**
   * 2段階認証用のリカバリーコードの再生成
   *
   * @returns string[] | undefined
   */
  const getRegenerateRecoveryCodes = async (): Promise<string[] | undefined> => {
    const codes = await Axios.post('user/two-factor-recovery-codes').then((res) => {
      if (res?.status === 200) {
        return getRecoveryCodes();
      }
    });

    return codes;
  };

  /**
   * 2段階認証処理
   *
   * @param challengeType 'code' | 'recovery_code'
   * @param code 'string'
   * @returns Promise<boolean>
   */
  const twoFactorChallenge = async (challengeType: TwoFAChallengeType, code: string) => {
    const res = await Axios.post('/two-factor-challenge', { [challengeType]: code }).then(
      (res) => res
    );

    return res.status === 204 ? true : false;
  };

  /**
   * CSRF Cookieの設定
   *
   * @returns Promise<boolean>
   */
  const getCsrf = async (): Promise<boolean> => {
    const csrf = await Axios.get('/sanctum/csrf-cookie').then((res) => res);

    return csrf.status === 204 ? true : false;
  };

  /**
   * パスワードの確認が必要か検証
   *
   * @returns Promise<boolean>
   */
  const getConfirmedPasswordStatus = async (): Promise<boolean> => {
    const confirmed = await Axios.get('user/confirmed-password-status').then(
      (res) => res.data.confirmed
    );

    return !confirmed ? true : false;
  };

  /**
   * 確認用のパスワードを送信し、検証結果を返す
   *
   * @param password string
   * @returns Promise<boolean>
   */
  const postConfirmPassword = async (password: string): Promise<boolean> => {
    const status = await Axios.post('user/confirm-password', { password }).then(
      (res) => res.status
    );

    return status === 201 ? true : false;
  };

  return {
    login,
    logout,
    getQrCode,
    getRecoveryCodes,
    enableTwoFA,
    disableTwoFA,
    getRegenerateRecoveryCodes,
    twoFactorChallenge,
    getCsrf,
    getConfirmedPasswordStatus,
    postConfirmPassword,
  };
};

export default useAuth;
