import React from 'react';
import styles from './TwoFactorInfo.module.css';

type PropsType = {
  svg: string;
  recoveryCodes: string[];
  onClickRegenerateCodes: () => Promise<void>;
};

const TwoFactorInfo: React.FC<PropsType> = ({ svg, recoveryCodes, onClickRegenerateCodes }) => {
  return (
    <div>
      {svg && <div dangerouslySetInnerHTML={{ __html: svg }} className={styles.qrCode}></div>}
      {recoveryCodes && (
        <div className={styles.codesContainer}>
          <ul>
            {recoveryCodes.map((code) => (
              <li key={code}>{code}</li>
            ))}
          </ul>
        </div>
      )}
      <button type="button" className={styles.regenerateButton} onClick={onClickRegenerateCodes}>
        regenerate recovery codes
      </button>
    </div>
  );
};

export default TwoFactorInfo;
