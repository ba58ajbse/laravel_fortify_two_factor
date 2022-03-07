import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import ErrorText from '../../uiParts/ErrorText';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Signup.module.css';

type FormValuesType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

const Signup = () => {
  const [asyncError, setAsyncError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesType>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValuesType> = async (data) => {
    await axios
      .get('/sanctum/csrf-cookie')
      .then(() => {
        axios
          .post('/register', { ...data }, { withCredentials: true })
          .then(() => {
            navigate('/');
          })
          .catch((err) => {
            setAsyncError('通信に失敗しました');
            console.log(err);
          });
      })
      .catch((err) => {
        setAsyncError('通信に失敗しました');
        console.log(err);
      });
  };

  return (
    <div className={styles.container}>
      <h3>Signup</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          id="name"
          autoFocus
          placeholder="name"
          className={styles.input}
          {...register('name', { required: true })}
        />
        <br />
        {errors.name && <ErrorText>名前を入力してください</ErrorText>}
        <br />
        <input
          type="email"
          id="email"
          placeholder="email"
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
          autoComplete="new-password"
          className={styles.input}
          {...register('password', { required: true })}
        />
        <br />
        {errors.password && <ErrorText>パスワードを入力してください</ErrorText>}
        <br />
        <input
          type="password"
          id="password_confirmation"
          placeholder="password confirmation"
          autoComplete="new-password"
          className={styles.input}
          {...register('password_confirmation', { required: true })}
        />
        <br />
        {errors.password_confirmation && (
          <ErrorText>確認用のパスワードを入力してください</ErrorText>
        )}
        <br />
        <button type="submit" className={styles.submitButton}>
          register
        </button>
        <br />
        {asyncError && <ErrorText>{asyncError}</ErrorText>}
      </form>
      <Link to="/login">ログインページに移動</Link>
    </div>
  );
};

export default Signup;
