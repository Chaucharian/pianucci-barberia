import React, {useState} from "react";
import Modal from './modal';
import ReflectButton from "../reflectButton";
import WhiteTextField from "../textField";

export const PayModal = ({ ...props}) => {
  const { onAction } = props;
  const [amount, setAmount] = useState("");

  const submit = () => {
    const normalizedAmount = amount.length === 0 ? "0" : amount;
    onAction("confirm", normalizedAmount);
  };

  const inputChange = ({ target: { value } }) => setAmount(value);

  return (
    <Modal {...props}>
     <>
      <WhiteTextField
        placeholder="0$"
        name="amount"
        margin="normal"
        type="number"
        value={amount}
        onChange={inputChange}
      ></WhiteTextField>
      <div>
        <ReflectButton text="COBRAR" clicked={() => submit()} />
        <ReflectButton text="CANCELAR" clicked={() => onAction("cancel")} />
      </div>
    </>
  </Modal>
  );
}