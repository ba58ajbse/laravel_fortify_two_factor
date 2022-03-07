import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthTwoFAState } from '../../../store/auth/slice';
import useAuth from '../useAuth';

const useTwoFactorAuth = () => {
  const [qrCode, setQrCode] = useState('');
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([]);
  const [openTwoFAInfo, setOpenTwoFAInfo] = useState(false);
  const { enableTwoFA, disableTwoFA, getQrCode, getRecoveryCodes, getRegenerateRecoveryCodes } =
    useAuth();
  const dispatch = useDispatch();

  /**
   * 2段階認証有効化
   * QRCode、リカバリーコードの取得、storeの2段階認証利用状態 true
   *
   * @returns Promise<void>
   */
  const enable2FA = async (): Promise<void> => {
    const isEnabled = await enableTwoFA();
    if (isEnabled) {
      const [qrCodeSvg, recoveryCodesArray] = await Promise.all([getQrCode(), getRecoveryCodes()]);

      if (!qrCodeSvg || !recoveryCodesArray) return;

      setQrCode(qrCodeSvg);
      setRecoveryCodes(recoveryCodesArray);
      dispatch(setAuthTwoFAState({ enable_two_factor: true }));
      setOpenTwoFAInfo(true);
    }
  };

  /**
   * 2段階認証無効化
   * storeの2段階認証利用状態 false
   *
   * @returns Promise<void>
   */
  const disable2FA = async (): Promise<void> => {
    const isDeleted = await disableTwoFA();
    if (isDeleted) {
      setOpenTwoFAInfo(false);
      dispatch(setAuthTwoFAState({ enable_two_factor: false }));
    }
  };

  /**
   * リカバリーコードの取得
   *
   * @returns Promise<void>
   */
  const showRecoveryCodes = async (): Promise<void> => {
    const codes = await getRecoveryCodes();
    if (codes.length > 0) {
      setRecoveryCodes(codes);
      setOpenTwoFAInfo(true);
    }
  };

  /**
   * リカバリーコード再生成、取得
   */
  const regenerateRecoveryCodes = async (): Promise<void> => {
    const codes = await getRegenerateRecoveryCodes();
    if (codes && codes.length > 0) {
      setRecoveryCodes(codes);
      setOpenTwoFAInfo(true);
    }
  };

  return {
    enable2FA,
    disable2FA,
    qrCode,
    recoveryCodes,
    openTwoFAInfo,
    showRecoveryCodes,
    regenerateRecoveryCodes,
  };
};

export default useTwoFactorAuth;
