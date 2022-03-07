import { Dispatch } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setAuthState } from '../../../store/auth/slice';
import useAuth from '../../auth/useAuth';

type LoginFormType = {
  email: string;
  password: string;
};

const useLogin = () => {
  const { getCsrf, login: postLogin } = useAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  /**
   * ログイン処理
   * CSRF Cookieの設定、2段階認証の場合確認画面の表示
   *
   * @param data
   * @param setOpenTwoFactor
   * @returns 'error' | undefined
   */
  const loginChallenge = async (
    data: LoginFormType,
    setOpenTwoFactor: Dispatch<React.SetStateAction<boolean>>
  ) => {
    const { email, password } = { ...data };
    const csrf = await getCsrf();

    if (!csrf) {
      return 'error';
    }

    const res = await postLogin(email, password);

    if (res === 'error') {
      return 'error';
    }

    if (res === 'login') {
      login();
    }

    if (res === 'two_factor') {
      setOpenTwoFactor(true);
    }
  };

  /**
   * ログイン成功時の処理
   * 認証状態をtrue, メイン画面への遷移
   */
  const login = () => {
    dispatch(setAuthState({ auth: true }));
    navigate('/');
  };

  return { login, loginChallenge };
};

export default useLogin;
