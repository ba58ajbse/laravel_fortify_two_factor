import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorText from '../../uiParts/ErrorText';
import { Link } from 'react-router-dom';
import { ERROR_MSG } from '../../../library/const';
import TwoFactorChallenge from '../../auth/TwoFactorChallenge/TwoFactorChallenge';
import useLogin from './useLogin';
import styles from './Login.module.css';

type FormValues = {
  email: string;
  password: string;
};

const Login = () => {
  const [asyncError, setAsyncError] = useState('');
  const [openTwoFactor, setOpenTwoFactor] = useState(false);
  const { loginChallenge } = useLogin();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const res = await loginChallenge(data, setOpenTwoFactor);

    if (res === 'error') {
      setAsyncError(ERROR_MSG.LOGIN);
    }
  };

  return (
    <div className={styles.container}>
      <h3>Login</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="email"
          id="email"
          placeholder="email"
          autoComplete="username"
          className={styles.input}
          {...register('email', { required: true })}
        />
        <br />
        {errors.email && <ErrorText>メールアドレスを入力してください</ErrorText>}
        <br />
        <input
          type="password"
          id="password"
          placeholder="password"
          autoComplete="current-password"
          className={styles.input}
          {...register('password', { required: true })}
        />
        <br />
        {errors.password && <ErrorText>パスワードを入力してください</ErrorText>}
        <br />
        <button type="submit" className={styles.submitButton}>
          Login
        </button>
        <br />
        {asyncError && <ErrorText>{asyncError}</ErrorText>}
      </form>
      <Link to="/signup">登録ページに移動</Link>
      {openTwoFactor && (
        <TwoFactorChallenge setOpenTwoFactor={setOpenTwoFactor} setAsyncError={setAsyncError} />
      )}
    </div>
  );
};

export default Login;
