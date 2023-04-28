import {
  buttonTypes,
  challengeFormats,
  challengeTypes,
  EnvType,
  FingerSubBioType,
  IrisBioSubType,
} from "./ClientConstant";

interface IAuthResponse {
  transactionId: string;
}

interface IAuthChallenge {
  authFactoryType: challengeTypes;
  format: challengeFormats;
  challenge: string;
}

interface IAuthenticationFactor {
  type: string;
  count: number;
  subTypes: string[];
}

interface IOAuthDetailResponse {
  transactionId: string;
  clientName: string;
  logoUrl: string;
  authFactors: Array<IAuthenticationFactor[]>;
  authorizeScopes: string[];
  essentialClaims: string[];
  voluntaryClaims: string[];
  configs: Record<string, Object>;
  redirectUri: string;
}

interface IAuthCodeResponse {
  nonce: string;
  state: string;
  code: string;
  redirectUri: string;
}

interface IOtpResponse {
  transactionId: string;
  maskedEmail: string;
  maskedMobile: string;
}

interface ICsrfToken {
  headerName: string;
  parameterName: string;
  token: string;
}

interface IDeviceInfo {
  specVersion: string[];
  env: string;
  digitalId: IDigitalId | string;
  deviceId: string;
  deviceCode: string;
  purpose: string;
  serviceVersion: string;
  deviceStatus: string;
  firmware: string;
  certification: string;
  deviceSubId: string[];
  callbackId: string;
}

interface IDigitalId {
  serialNo: string;
  make: string;
  model: string;
  type: string;
  deviceSubType: string;
  deviceProviderId: string;
  deviceProvider: string;
  dateTime: string;
}

interface IDiscoverResponse {
  deviceId: string;
  deviceStatus: string;
  certification: string;
  serviceVersion: string;
  callbackId: string;
  digitalId: IDigitalId;
  deviceCode: string;
  purpose: string;
  error: IErrorInfo;
  specVersion: string[];
  deviceSubId: string[];
}

interface IErrorInfo {
  errorCode: string;
  errorInfo: string;
}

interface IBioLoginFields {
  inputFields: IInputField[];
}

interface IInputField {
  labelText: string;
  labelFor: string;
  id: string;
  name: string;
  type: string;
  autoComplete: string;
  isRequired: boolean;
  placeholder: string;
}

interface IErrorClass {
  prefix?: string;
  errorCode?: string;
  defaultMsg?: string;
}

interface IDeviceDetail {
  port: number;
  specVersion: string;
  type: string;
  deviceId: string;
  model: string;
  serialNo: string;
  text: string;
  value: string;
  icon: string;
}

interface IFormActionProps {
  type?: buttonTypes;
  text?: string | null;
  disabled?: boolean;
  handleClick?: () => void;
}

interface IBiometricEnv {
  env: EnvType;
  captureTimeout: number;
  irisBioSubtypes: IrisBioSubType;
  fingerBioSubtypes: FingerSubBioType;
  faceCaptureCount: number;
  faceCaptureScore: number;
  fingerCaptureCount: number;
  fingerCaptureScore: number;
  irisCaptureCount: number;
  irisCaptureScore: number;
  portRange: string;
  discTimeout: number;
  dinfoTimeout: number;
  domainUri: string;
}

export {
  IAuthChallenge,
  IAuthResponse,
  IOAuthDetailResponse,
  IAuthenticationFactor,
  IAuthCodeResponse,
  IOtpResponse,
  ICsrfToken,
  IDeviceInfo,
  IDigitalId,
  IDiscoverResponse,
  IErrorInfo,
  IBioLoginFields,
  IInputField,
  IErrorClass,
  IDeviceDetail,
  IFormActionProps,
  IBiometricEnv,
};
