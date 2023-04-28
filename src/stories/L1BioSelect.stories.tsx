import type { Meta, StoryObj } from "@storybook/react";

import { L1BioSelect } from "../index";
import { IL1BioSelectProps } from "../lib/models";

const L1BioSelectMeta: Meta<typeof L1BioSelect> = {
  title: "L1BioSelect",
  component: L1BioSelect,
  tags: ["autodocs"],
  argTypes: {
    labelName: {
      control: "text",
    },
    buttonName: {
      control: "text",
    },
    transactionId: {
      control: "text",
    },
    jsonCss: {
      control: "object",
    },
    biometricEnv: {
      control: "object",
    },
  },
};

export default L1BioSelectMeta;
type Story = StoryObj<typeof L1BioSelectMeta>;

const myChange = (e: any) => {
  console.log("my changes");
  console.log(e);
};

const myError = (e: any) => {
  console.log("my error");
  console.log(e);
};

export const L1BioSelectStory: StoryObj<typeof L1BioSelectMeta> = {
  render: (args) => {
    return (
      <div style={{ width: "300px" }}>
        <L1BioSelect {...args} />
      </div>
    );
  },
};
L1BioSelectStory.args = {
  labelName: "Biometric Device",
  buttonName: "Scan & Verify",
  transactionId: "My Transaction Id",
  biometricEnv: {
    env: "Staging",
    captureTimeout: 30,
    irisBioSubtypes: "UNKNOWN",
    fingerBioSubtypes: "UNKNOWN",
    faceCaptureCount: 1,
    faceCaptureScore: 70,
    fingerCaptureCount: 1,
    fingerCaptureScore: 70,
    irisCaptureCount: 1,
    irisCaptureScore: 70,
    portRange: "4501-4510",
    discTimeout: 1000,
    dinfoTimeout: 1000,
  },
  onCapture: myChange,
  onErrored: myError,
};
