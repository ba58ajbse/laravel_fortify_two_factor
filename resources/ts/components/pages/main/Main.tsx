import React from 'react';
import useAuth from '../../auth/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import styles from './Main.module.css';

const Main = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const onClickLogout = async () => {
    const res = await logout();
    if (res) {
      navigate('/login');
    }
  };

  return (
    <>
      <div className={styles.container}>
        <h3>Main Page</h3>
        <Link to="/profile">プロフィール</Link>
        <br />
        <button type="button" className={styles.primaryButton} onClick={onClickLogout}>
          Logout
        </button>
      </div>
    </>
  );
};

export default Main;
