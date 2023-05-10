import { useState, useEffect } from "react";
import Select from "react-select";
import { LoadingIndicator } from "../common";
import {
  DeviceState,
  DeviceStateStatus,
  IBiometricEnv,
  IDeviceDetail,
  IDeviceInfo,
  IL1BioSelectProps,
  LoadingStates as states,
} from "../models";
import { localStorageService, SbiService } from "../service";

import faceIcon from "../assets/face_sign_in.png";
import fingerIcon from "../assets/fingerprint_sign_in.png";
import irisIcon from "../assets/iris_sign_in.png";

import "./L1BioSelect.scss";

const host = "http://127.0.0.1";

const modalityIconPath: { [name: string]: string } = {
  Face: faceIcon,
  Finger: fingerIcon,
  Iris: irisIcon,
};

const L1BioSelect = (props: IL1BioSelectProps) => {
  const errorRibbonClass =
    "p-2 mt-1 mb-1 w-full text-center text-sm rounded-lg text-red-700 bg-red-100 ";

  const loadingContClass =
    "absolute bottom-0 left-0 bg-white bg-opacity-70 h-full w-full flex justify-center font-semibold";

  const verifyButtonClass =
    "cursor-pointer block w-full font-medium rounded-lg text-sm px-5 py-2 text-center border border-2 ";

  const scanButtomClass =
    "cursor-pointer flex items-center ml-auto text-gray-900 bg-white shadow border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-lg px-3 py-1 ml-1";

  const sbiService = new SbiService(props.biometricEnv as IBiometricEnv);
  const { getDeviceInfos } = {
    ...localStorageService,
  };
  const [modalityDevices, setModalityDevices] = useState<IDeviceDetail[]>();

  const [selectedDevice, setSelectedDevice] = useState<IDeviceDetail>();

  const [status, setStatus] = useState({
    state: states.LOADED,
    msg: "",
  });

  const [timer, setTimer] = useState<number | null | any>(null);

  const [errorState, setErrorState] = useState<string | null>(null);

  useEffect(() => {
    scanDevices();
  }, []);

  const scanDevices = () => {
    props.onErrored(null);
    setErrorState(null);
    try {
      setStatus({
        state: states.LOADING,
        msg: "Scanning Devices. Please Wait...",
      });

      discoverDevicesAsync(host);
    } catch (error: any) {
      setErrorState("Device discovery failed");
      props.onErrored({
        prefix: "Device discovery failed",
        errorCode: error.message,
        defaultMsg: error.message,
      });
    }
  };

  const discoverDevicesAsync = async (host: string) => {
    if (timer) {
      clearInterval(timer);
    }
    let timePassed = 0;
    let dicoverTimeout = (props.biometricEnv as IBiometricEnv).discTimeout;
    const intervalId = setInterval(async () => {
      timePassed += 2;

      await sbiService.mosipdisc_DiscoverDevicesAsync(host);
      let timeLeft = dicoverTimeout - timePassed;
      if (timeLeft <= 0) {
        clearInterval(intervalId);
        setStatus({ state: states.LOADED, msg: "" });
        setErrorState("Device discovery failed");
        props.onErrored({
          prefix: "Device discovery failed",
          errorCode: "device_not_found_msg",
          defaultMsg: "Device not found",
        });
      } else if (
        localStorageService.getDeviceInfos() &&
        Object.keys(localStorageService.getDeviceInfos()).length > 0
      ) {
        setErrorState(null);
        clearInterval(intervalId);
        setStatus({ state: states.LOADED, msg: "" });
        refreshDeviceList();
      }
    }, 3000);

    setTimer(intervalId);
  };

  const refreshDeviceList = () => {
    let deviceInfosPortsWise = getDeviceInfos();

    if (!deviceInfosPortsWise) {
      setModalityDevices([]);
      setErrorState("No device found");
      props.onErrored({
        errorCode: "no_devices_found_msg",
      });
      return;
    }

    let modalitydevices: any[] = [];

    Object.keys(deviceInfosPortsWise).map((port: any) => {
      let deviceInfos = deviceInfosPortsWise[port];

      deviceInfos?.forEach((deviceInfo: IDeviceInfo) => {
        if (typeof deviceInfo.digitalId !== "string") {
          let deviceDetail: IDeviceDetail = {
            port: port,
            specVersion: deviceInfo?.specVersion[0],
            type: deviceInfo?.digitalId.type,
            deviceId: deviceInfo?.deviceId,
            model: deviceInfo?.digitalId.model,
            serialNo: deviceInfo?.digitalId.serialNo,
            text:
              deviceInfo?.digitalId.make + "-" + deviceInfo?.digitalId.model,
            value: deviceInfo?.digitalId.serialNo,
            icon: modalityIconPath[deviceInfo?.digitalId.type],
            status: DeviceStateStatus[deviceInfo?.deviceStatus],
          };
          modalitydevices.push(deviceDetail);
        }
      });
    });

    setModalityDevices(modalitydevices);

    if (modalitydevices.length === 0) {
      setErrorState("No device found");
      props.onErrored({
        errorCode: "no_devices_found_msg",
      });
      return;
    }

    let selectedDevice =
      modalitydevices?.find((_) => _.status === DeviceState.READY.value) ??
      modalitydevices[0];

    setSelectedDevice(selectedDevice);
  };

  const handleDeviceChange = (device: any) => setSelectedDevice(device);

  const handleScan = () => scanDevices();

  const scanAndVerify = () => startCapture();

  const startCapture = async () => {
    props.onErrored(null);
    setErrorState(null);
    if (selectedDevice === null || selectedDevice === undefined) {
      setErrorState("Device not found");
      props.onErrored({
        errorCode: "device_not_found_msg",
      });
      return;
    }

    let biometricResponse = null;

    try {
      setStatus({
        state: states.AUTHENTICATING,
        msg: `${selectedDevice.type} capture initiated on ${selectedDevice.model}`,
      });

      biometricResponse = await sbiService.capture_Auth(
        host,
        selectedDevice.port,
        props.transactionId,
        selectedDevice.specVersion,
        selectedDevice.type,
        selectedDevice.deviceId
      );

      setStatus({ state: states.LOADED, msg: "" });
    } catch (error: any) {
      setErrorState("Biometric capture failed");
      props.onErrored({
        prefix: "Biometric Capture Failed",
        errorCode: error.message,
        defaultMsg: error.message,
      });
      return;
    }

    props.onCapture(biometricResponse);
  };

  const bioSelectOptionLabel = (e: IDeviceDetail) => (
    <div className="flex items-center h-7">
      <img className="w-7" src={e.icon} />
      <span className="ml-2 text-xs">{e.text}</span>
      <span className={DeviceState[e.status].class + " ml-auto"}></span>
    </div>
  );

  const errorStateDiv = (eMsg: string) => (
    <div className={errorRibbonClass} role="alert">
      {eMsg}
    </div>
  );

  return (
    <>
      {(status.state === states.LOADING ||
        status.state === states.AUTHENTICATING) && (
        <div className={loadingContClass}>
          <div className="flex items-center">
            <LoadingIndicator size="medium" message={status.msg} />
          </div>
        </div>
      )}
      {status.state === states.LOADED && (
        <div className="flex flex-col">
          <div className="flex flex-col justify-center w-full">
            <label
              htmlFor="modality_device"
              className="block mb-2 text-xs font-medium text-gray-900 text-opacity-70"
            >
              {props.labelName}
            </label>
            <div className="flex items-stretch">
              <Select
                name="modality_device"
                id="modality_device"
                aria-label="Modality Device Select"
                className="block rounded bg-white shadow w-full mr-2"
                value={selectedDevice}
                options={modalityDevices}
                onChange={handleDeviceChange}
                formatOptionLabel={(e: any) => bioSelectOptionLabel(e)}
              />
              <button
                type="button"
                className={scanButtomClass}
                onClick={handleScan}
              >
                &#x21bb;
              </button>
            </div>
          </div>
          <div className="flex py-2">
            {!errorState && (
              <>
                {selectedDevice &&
                  selectedDevice.status == DeviceStateStatus.Ready && (
                    <button
                      type="button"
                      value="button"
                      onClick={scanAndVerify}
                      className={verifyButtonClass}
                    >
                      {props.buttonName}
                    </button>
                  )}
                {selectedDevice &&
                  selectedDevice.status != DeviceStateStatus.Ready &&
                  errorStateDiv(
                    selectedDevice.text +
                      " device is " +
                      DeviceState[selectedDevice.status].name
                  )}
              </>
            )}
            {errorState && errorStateDiv(errorState)}
          </div>
        </div>
      )}
    </>
  );
};

export default L1BioSelect;
