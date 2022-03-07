import React from 'react';
import styles from './ErrorText.module.css';

const ErrorText: React.FC = ({ children }) => {
  return <span className={styles.errorText}>{children}</span>;
};

export default ErrorText;
