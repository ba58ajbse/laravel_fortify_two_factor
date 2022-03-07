export type ConfirmPasswordType = {
  open: boolean;
  callback: (() => Promise<void>) | undefined;
};
