import { IError } from "../IQuestion";

export interface IBase {
  isSuccess: boolean;
  isFailure: boolean;
  error: IError;
}
