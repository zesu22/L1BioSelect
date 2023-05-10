type EnvType = "Staging" | "Developer" | "Pre-Production" | "Production";

type FingerSubBioType =
  | "Left IndexFinger"
  | "Left MiddleFinger"
  | "Left RingFinger"
  | "Left LittleFinger"
  | "Left Thumb"
  | "Right IndexFinger"
  | "Right MiddleFinger"
  | "Right RingFinger"
  | "Right LittleFinger"
  | "Right Thumb"
  | "UNKNOWN";

type IrisBioSubType = "Left" | "Right" | "UNKNOWN";

type DeviceStateStatusType = "READY" | "NOTREADY" | "BUSY" | "NOTREGISTERED";

enum BioType {
  FACE = "Face",
  FINGER = "Finger",
  IRIS = "Iris",
}

const DeviceStateStatus: { [name: string]: DeviceStateStatusType } = {
  Ready: "READY",
  "Not Ready": "NOTREADY",
  Busy: "BUSY",
  "Not Registered": "NOTREGISTERED",
};

interface IDeviceState {
  value: string;
  name: string;
  class: string;
  symbol: string;
}

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

export {
  EnvType,
  BioType,
  IrisBioSubType,
  FingerSubBioType,
  DeviceStateStatus,
  DeviceStateStatusType,
  DeviceState,
};
