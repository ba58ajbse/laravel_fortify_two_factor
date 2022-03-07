import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthTFAState } from '../../../store/auth/selector';
import useConfirmPassword from '../../auth/ConfirmPassword/useConfirmPassword';
import TwoFactorInfo from '../../auth/TwoFactorInfo/TwoFactorInfo';
import useTwoFactorAuth from '../../auth/TwoFactorInfo/useTwoFactorAuth';
import { setConfirmPasswordState } from '../../../store/confirmPassword/slice';
import { selectConfirmPasswordOpen } from '../../../store/confirmPassword/selector';
import ConfirmPassword from '../../auth/ConfirmPassword/ConfirmPassword';
import styles from './Profile.module.css';

const Profile = () => {
  const twoFAstate = useSelector(selectAuthTFAState);
  const openConfirmPassword = useSelector(selectConfirmPasswordOpen);
  const dispatch = useDispatch();
  const { checkConfirmPasswordStatus } = useConfirmPassword();
  const {
    enable2FA,
    disable2FA,
    showRecoveryCodes,
    qrCode,
    recoveryCodes,
    openTwoFAInfo,
    regenerateRecoveryCodes,
  } = useTwoFactorAuth();

  /**
   * 2段階認証有効化
   * QRコード、リカバリーコードの表示
   *
   * @returns Promise<void>
   */
  const onClickEnable = async (): Promise<void> => {
    const needConfirmed = await checkConfirmPasswordStatus();

    if (needConfirmed) {
      dispatch(setConfirmPasswordState({ open: true, callback: enable2FA }));
      return;
    } else {
      enable2FA();
    }
  };

  /**
   * 2段階認証無効化
   *
   * @returns Promise<void>
   */
  const onClickDisable = async (): Promise<void> => {
    const needConfirmed = await checkConfirmPasswordStatus();
    if (needConfirmed) {
      dispatch(setConfirmPasswordState({ open: true, callback: disable2FA }));
      return;
    } else {
      disable2FA();
    }
  };

  /**
   * リカバリーコードの表示
   *
   * @returns Promise<void>
   */
  const onClickShowRecoveryCodes = async (): Promise<void> => {
    const needConfirmed = await checkConfirmPasswordStatus();
    if (needConfirmed) {
      dispatch(setConfirmPasswordState({ open: true, callback: showRecoveryCodes }));
      return;
    } else {
      showRecoveryCodes();
    }
  };

  /**
   * リカバリーコードの再生成
   *
   * @returns Promise<void>
   */
  const onClickRegenerateCodes = async (): Promise<void> => {
    const needConfirmed = await checkConfirmPasswordStatus();
    if (needConfirmed) {
      dispatch(setConfirmPasswordState({ open: true, callback: regenerateRecoveryCodes }));
      return;
    } else {
      regenerateRecoveryCodes();
    }
  };

  return (
    <div className={styles.container}>
      <h3>Profile</h3>
      {twoFAstate && (
        <button type="button" className={styles.disableButton} onClick={onClickDisable}>
          Disable
        </button>
      )}

      {!twoFAstate && (
        <button type="button" className={styles.enableButton} onClick={onClickEnable}>
          Enable
        </button>
      )}
      {twoFAstate && !openTwoFAInfo && (
        <button
          type="button"
          className={styles.recoveryCodesButton}
          onClick={onClickShowRecoveryCodes}
        >
          show recovery codes
        </button>
      )}
      {twoFAstate && openTwoFAInfo && (
        <TwoFactorInfo
          svg={qrCode}
          recoveryCodes={recoveryCodes}
          onClickRegenerateCodes={onClickRegenerateCodes}
        />
      )}
      {openConfirmPassword && <ConfirmPassword />}
    </div>
  );
};

export default Profile;
