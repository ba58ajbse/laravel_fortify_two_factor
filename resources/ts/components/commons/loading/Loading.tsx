import React from 'react';
import styles from './Loading.module.css';

const Loading = () => {
  return (
    <div className={styles.layer}>
      <div className={styles.loadingText}>Loading...</div>
    </div>
  );
};

export default Loading;
