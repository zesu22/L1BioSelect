import type { Meta, StoryObj } from "@storybook/react";

import { L1BioSelect } from "../index";

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
  
export const L1BioSelectStory: Story = {
    args: {
        labelName: 'My Label',
        buttonName: 'My Button Name',
        transactionId: 'My Transaction Id',
        onCapture: myChange,
        onErrored: myError
    }
}
