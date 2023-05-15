import { IDeviceState } from "./StandardInterface";
import { DeviceStateStatusType } from "./StandardType";

const DeviceStateStatus: { [name: string]: DeviceStateStatusType } = {
  Ready: "READY",
  "Not Ready": "NOTREADY",
  Busy: "BUSY",
  "Not Registered": "NOTREGISTERED",
};

const DeviceState: { [name in DeviceStateStatusType]: IDeviceState } = {
  READY: {
    value: "READY",
    name: "Ready",
    class: "ready",
    symbol: "\u25CF",
  },
  NOTREADY: {
    value: "NOTREADY",
    name: "Not Ready",
    class: "not-ready",
    symbol: "\u25CF",
  },
  BUSY: {
    value: "BUSY",
    name: "Busy",
    class: "busy",
    symbol: "\u25CF",
  },
  NOTREGISTERED: {
    value: "NOTREGISTERED",
    name: "Not Registered",
    class: "not-registered",
    symbol: "\u25CE",
  },
};

const LoadingStates = {
  LOADING: "LOADING",
  LOADED: "LOADED",
  ERROR: "ERROR",
  AUTHENTICATING: "AUTHENTICATING",
};

const host = "http://127.0.0.1";
const errorRibbonClass =
  "p-2 mt-1 mb-1 w-full text-center text-sm rounded-lg text-red-700 bg-red-100 ";

const loadingContClass =
  "bottom-0 left-0 bg-white bg-opacity-70 py-4 h-full w-full flex justify-center font-semibold";

const verifyButtonClass =
  "cursor-pointer block w-full font-medium rounded-lg text-sm px-5 py-2 text-center border border-2 ";

const scanButtonClass =
  "cursor-pointer flex items-center ml-auto text-gray-900 bg-white shadow border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-lg px-3 py-1 ml-1";

export {
  host,
  DeviceState,
  DeviceStateStatus,
  LoadingStates,
  errorRibbonClass,
  loadingContClass,
  verifyButtonClass,
  scanButtonClass,
};
