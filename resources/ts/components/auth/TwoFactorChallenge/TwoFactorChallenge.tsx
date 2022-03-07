import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorText from '../../uiParts/ErrorText';
import useTwoFactorChallenge from './useTwoFactorChallenge';
import styles from './TwoFactorChallenge.module.css';
import Overlay from '../../commons/overlay/Overlay';

type FormValue = {
  code?: string;
  recovery_code?: string;
};

type TwoFAType = 'code' | 'recovery_code';

type PropType = {
  setOpenTwoFactor: React.Dispatch<React.SetStateAction<boolean>>;
  setAsyncError: React.Dispatch<React.SetStateAction<string>>;
};

const TwoFactorChallenge: React.FC<PropType> = ({ setOpenTwoFactor, setAsyncError }) => {
  const [twoFAType, setTwoFAType] = useState<TwoFAType>('code');
  const { twoFactorChallenge } = useTwoFactorChallenge();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit: SubmitHandler<FormValue> = async (data) => {
    const challengeType = twoFAType;
    const code = data[challengeType];
    if (!code) return;

    const res = await twoFactorChallenge(challengeType, code);

    if (!res) {
      setOpenTwoFactor(false);
      setAsyncError('ログインに失敗しました');
    }
  };

  return (
    <Overlay>
      <form onSubmit={handleSubmit(onSubmit)}>
        <p>Two Factor Authentication Code</p>
        <br />
        <input
          type={twoFAType}
          placeholder={twoFAType}
          autoComplete={`current-${twoFAType}`}
          autoFocus
          className={styles.input}
          {...register(twoFAType, { required: true })}
        />
        <br />
        {errors[twoFAType] && <ErrorText>{'コードを入力してください'}</ErrorText>}
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
        <br />
        {twoFAType === 'code' && (
          <button type="button" onClick={() => setTwoFAType('recovery_code')}>
            リカバリーコードでログインする
          </button>
        )}
        {twoFAType === 'recovery_code' && (
          <button type="button" onClick={() => setTwoFAType('code')}>
            2要素認証でログインする
          </button>
        )}
      </form>
    </Overlay>
  );
};

export default TwoFactorChallenge;
