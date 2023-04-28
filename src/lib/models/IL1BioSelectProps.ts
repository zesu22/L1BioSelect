import { IErrorClass } from "./StandardInterface";

interface IL1BioSelectProps {
    labelName: string;
    buttonName: string;
    transactionId: string;
    jsonCss?: Object;
    biometricEnv?: Object;
    onCapture: (biometricResponse: Object) => void;
    onErrored: (errorObj: IErrorClass | null) => void;
  }
  
  export { IL1BioSelectProps };