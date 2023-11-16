import { Inputs } from './auth.interface';

export type Ilogin = Inputs;

export interface IloginRes {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  activated: boolean;
  firstName: null;
  lastName: null;
  otp_enabled: boolean;
  otp_verified: boolean;
  otp_ascii: null;
  otp_hex: string;
}
