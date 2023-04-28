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

  export { IDeviceDetail, IErrorClass };