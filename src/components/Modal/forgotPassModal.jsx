import React, {useState} from "react";
import Modal from './modal';
import ReflectButton from "/components/reflectButton";
import { TextField } from "/core/Atoms";
import { useForm } from "react-hook-form";

export const ForgotPassModal = ({ onSubmit,...props}) => {
  const { onAction } = props;
  const { register, handleSubmit, errors } = useForm();

  return (
    <Modal {...props}>
     <>
        <form
        className={classes.formContainer}
        onSubmit={handleSubmit(onSubmit)}
        >
        <TextField
            inputRef={register({
                required: true,
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                },
            })}
            error={errors.email}
            label="Email"
            name="email"
            margin="normal"
            type="email"
        />
        <ReflectButton text="RESTAURAR" />
        </form>
    </>
  </Modal>
  );
}