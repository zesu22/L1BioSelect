import { IL1BioSelectProps } from "../models";

const L1BioSelect = (props: IL1BioSelectProps) => {
    return (
        <>
        <div>Hello this is a library component</div>
        <div>Button name = {props.buttonName}</div>
        <div>Label name = {props.labelName}</div>
        <div>Transaction Id = {props.transactionId}</div>
        </>
    );
};

export default L1BioSelect;