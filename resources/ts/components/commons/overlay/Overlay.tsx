import React, { FC, MouseEvent } from 'react';
import styles from './Overlay.module.css';

type PropType = {
  close?: () => void;
};

const Overlay: FC<PropType> = ({ children, close }) => {
  const stop = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const handleClose = () => {
    if (!close) return;
    close();
  };

  return (
    <div className={styles.layer} onClick={handleClose}>
      <div className={styles.container} onClick={stop}>
        {children}
      </div>
    </div>
  );
};

export default Overlay;
