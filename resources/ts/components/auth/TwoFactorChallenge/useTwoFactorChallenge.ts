import { useDispatch } from 'react-redux';
import { setAuthTwoFAState } from '../../../store/auth/slice';
import useLogin from '../../pages/Login/useLogin';
import useAuth from '../useAuth';

type ChallengeType = 'code' | 'recovery_code';

const useTwoFactorChallenge = () => {
  const { login } = useLogin();
  const { twoFactorChallenge: twoFACallenge } = useAuth();
  const dispatch = useDispatch();

  const twoFactorChallenge = async (
    challengeType: ChallengeType,
    code: string
  ): Promise<boolean> => {
    const res = await twoFACallenge(challengeType, code);

    if (res) {
      login();
      dispatch(setAuthTwoFAState({ enable_two_factor: true }));
      return true;
    }

    return false;
  };

  return { twoFactorChallenge };
};

export default useTwoFactorChallenge;
