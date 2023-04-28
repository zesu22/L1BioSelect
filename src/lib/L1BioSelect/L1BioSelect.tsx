import { useState, useEffect } from "react";
import Select from "react-select";
import { LoadingIndicator } from "../common";
import {
  IBiometricEnv,
  IDeviceDetail,
  IDeviceInfo,
  IL1BioSelectProps,
  LoadingStates as states,
} from "../models";
import { localStorageService, SbiService } from "../service";

import "./L1BioSelect.scss";

const host = "http://127.0.0.1";

const modalityIconPath: { [name: string]: string } = {
  Face: "face_sign_in.png",
  Finger: "fingerprint_sign_in.png",
  Iris: "iris_sign_in.png",
};

const L1BioSelect = (props: IL1BioSelectProps) => {
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

  useEffect(() => {
    scanDevices();
  }, []);

  const scanDevices = () => {
    props.onErrored(null);
    try {
      setStatus({
        state: states.LOADING,
        msg: "Scanning Devices. Please Wait...",
      });

      sbiService.mosipdisc_DiscoverDevicesAsync(host).then(() => {
        setStatus({ state: states.LOADED, msg: "" });
        refreshDeviceList();
      });
    } catch (error: any) {
      props.onErrored({
        prefix: "Device discovery failed",
        errorCode: error.message,
        defaultMsg: error.message,
      });
    }
  };

  const refreshDeviceList = () => {
    let deviceInfosPortsWise = getDeviceInfos();

    if (!deviceInfosPortsWise) {
      setModalityDevices([]);
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
            specVersion: deviceInfo.specVersion[0],
            type: deviceInfo.digitalId.type,
            deviceId: deviceInfo.deviceId,
            model: deviceInfo.digitalId.model,
            serialNo: deviceInfo.digitalId.serialNo,
            text: deviceInfo.digitalId.make + "-" + deviceInfo.digitalId.model,
            value: deviceInfo.digitalId.serialNo,
            icon: modalityIconPath[deviceInfo.digitalId.type],
          };
          modalitydevices.push(deviceDetail);
        }
      });
    });

    setModalityDevices(modalitydevices);

    if (modalitydevices.length === 0) {
      props.onErrored({
        errorCode: "no_devices_found_msg",
      });
      return;
    }

    let selectedDevice = modalitydevices[0];
    setSelectedDevice(selectedDevice);
  };

  const handleDeviceChange = (device: any) => {
    setSelectedDevice(device);
  };

  const handleScan = () => {
    scanDevices();
  };

  const scanAndVerify = () => {
    console.log("********** scan and verify button has been click");
    startCapture();
  };

  const startCapture = async () => {
    console.log("********** start capture button has been click");

    props.onErrored(null);

    if (selectedDevice === null || selectedDevice === undefined) {
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
        // msgParam: {
        //   modality: t(selectedDevice.type),
        //   deviceModel: selectedDevice.model,
        // },
      });

      biometricResponse = await sbiService.capture_Auth(
        host,
        selectedDevice.port,
        props.transactionId,
        selectedDevice.specVersion,
        selectedDevice.type,
        selectedDevice.deviceId
      );

      console.log({ biometricResponse });

      // props.onCapture(biometricResponse);

      // let { errorCode, defaultMsg } =
      //   validateBiometricResponse(biometricResponse);

      setStatus({ state: states.LOADED, msg: "" });

      // if (errorCode !== null) {
      //   props.onErrored({
      //     prefix: "biometric_capture_failed_msg",
      //     errorCode: errorCode,
      //     defaultMsg: defaultMsg,
      //   });
      //   return;
      // }
    } catch (error: any) {
      console.log("********** error has been catched");

      console.log({ error });

      props.onErrored({
        prefix: "Biometric Capture Failed",
        errorCode: error.message,
        defaultMsg: error.message,
      });
      return;
    }

    props.onCapture(biometricResponse);
  };

  return (
    <>
      {status.state === states.LOADING && (
        <div className="block w-full">
          <LoadingIndicator size="medium" message={status.msg} />
        </div>
      )}
      {(status.state === states.LOADED ||
        status.state === states.AUTHENTICATING) &&
        modalityDevices && (
          <>
            {selectedDevice && (
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
                      formatOptionLabel={(e: any) => (
                        <div className="flex items-center h-7">
                          <img className="w-7" src={e.icon} />
                          <span className="ml-2 text-xs">{e.text}</span>
                        </div>
                      )}
                    />
                    <button
                      type="button"
                      className="cursor-pointer flex items-center ml-auto text-gray-900 bg-white shadow border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-lg px-3 py-1 ml-1"
                      onClick={handleScan}
                    >
                      &#x21bb;
                    </button>
                  </div>
                </div>
                <div className="flex py-2">
                  <button
                    type="button"
                    value="button"
                    onClick={scanAndVerify}
                    className="cursor-pointer block w-full font-medium rounded-lg text-sm px-5 py-2 text-center border border-2 "
                  >
                    {props.buttonName}
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      {status.state === states.AUTHENTICATING && (
        <div className="absolute bottom-0 left-0 bg-white bg-opacity-70 h-full w-full flex justify-center font-semibold">
          <div className="flex items-center">
            <LoadingIndicator size="medium" message={status.msg} />
          </div>
        </div>
      )}
    </>
  );
};

export default L1BioSelect;
