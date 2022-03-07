import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { selectConfirmPasswordCallback } from '../../../store/confirmPassword/selector';
import ErrorText from '../../uiParts/ErrorText';
import useConfirmPassword from './useConfirmPassword';
import Overlay from '../../commons/overlay/Overlay';
import styles from './ConfirmPassword.module.css';

type FormValuesType = {
  password: string;
};

const ConfirmPassword: React.FC = () => {
  const { confirmPassword, close } = useConfirmPassword();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValuesType>();
  const callback = useSelector(selectConfirmPasswordCallback);

  const submitConfirmPassword: SubmitHandler<FormValuesType> = async (data) => {
    const { password } = { ...data };
    const isConfirmPassword = await confirmPassword(password);

    if (!isConfirmPassword) {
      reset({ password: '' });
      return;
    }

    if (callback) {
      callback();
    }

    close();
  };

  return (
    <Overlay close={close}>
      <form onSubmit={handleSubmit(submitConfirmPassword)} className={styles.form}>
        <input
          type="password"
          id="password"
          placeholder="password"
          autoComplete="new-password"
          autoFocus
          className={styles.input}
          {...register('password', { required: true })}
        />
        <br />
        {errors.password && <ErrorText>パスワードを入力してください</ErrorText>}
        <br />
        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </Overlay>
  );
};

export default ConfirmPassword;
