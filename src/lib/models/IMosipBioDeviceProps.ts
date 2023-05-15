import { IBiometricEnv, IErrorClass } from "./StandardInterface";

interface IMosipBioDeviceProps {
  labelName: string;
  buttonName: string;
  transactionId: string;
  jsonCss?: Object;
  biometricEnv?: IBiometricEnv;
  disable?: boolean;
  langCode?: string;
  onCapture: (biometricResponse: Object) => void;
  onErrored: (errorObj: IErrorClass | null) => void;
}

export { IMosipBioDeviceProps };
