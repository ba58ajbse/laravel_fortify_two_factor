export type AuthType = {
  auth: boolean;
  name: string;
  email: string;
  enable_two_factor: boolean;
  two_factor_recovery_codes?: string[];
};

export type AuthResponseType = {
  name: string;
  email: string;
  two_factor_secret: string;
};
