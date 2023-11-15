export type Inputs = {
  email: string;
  password: string;
};

export interface IState {
  lockoutTime: number;
  attempts: number;
  disabled: boolean;
  passaPortAcesse: number;
}
