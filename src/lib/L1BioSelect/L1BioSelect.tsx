import { useState, useEffect } from "react";
import Select from "react-select";
import { IL1BioSelectProps, LoadingStates as states } from "../models";

const L1BioSelect = (props: IL1BioSelectProps) => {
  const [modalityDevices, setModalityDevices] = useState([
    { value: "Apple", label: "Apple" },
    { value: "Orange", label: "Orange" },
    { value: "Strawberry", label: "Strawberry" },
    { value: "Pineapple", label: "Pineapple" },
    { value: "Banana", label: "Banana" },
    { value: "Kiwi", label: "Kiwi" },
  ]);
  const [selectedDevice, setSelectedDevice] = useState();

  const [status, setStatus] = useState({
    state: states.LOADED,
    msg: "",
  });

  useEffect(() => {
    console.log("*********** It works on first render");
  }, []);

  

  const handleDeviceChange = (device: any) => {
    console.log("************* inside handle change");
    console.log(device);
  };

  const handleScan = () => {
    console.log("*********** handle scan has been click");
  };

  const scanAndVerify = () => {
    console.log("********** scan and verify button has been click");
  };

  return (
    <>
      <div className="flex flex-col justify-center w-full">
        <label
          htmlFor="modality_device"
          className="block mb-2 text-xs font-medium text-gray-900 text-opacity-70"
        >
          {props.labelName}
        </label>
        <div className="flex">
          <Select
            className="rounded bg-white shadow w-11/12"
            value={selectedDevice}
            options={modalityDevices}
            onChange={handleDeviceChange}
            // getOptionLabel={(e: any) =>
            //   `<div className="flex items-center h-7">
            //               <img className="w-7" src=${e.icon} />
            //               <span className="ml-2 text-xs">${e.text}</span>
            //             </div>`
            // }
          />
          <button
            type="button"
            className="flex text-gray-900 bg-white shadow border border-gray-300 hover:bg-gray-100 font-medium rounded-lg text-lg px-3 py-1 ml-1"
            onClick={handleScan}
          >
            &#x21bb;
          </button>
        </div>
      </div>
      <div className="flex justify-center py-2.5">
        <button
          type="button"
          value="button"
          onClick={scanAndVerify}
          className="flex justify-center w-full font-medium rounded-lg text-sm px-5 py-2 text-center border border-2 "
        >
          {props.buttonName}
        </button>
      </div>
    </>
  );
};

export default L1BioSelect;
