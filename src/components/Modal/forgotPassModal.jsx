import React, { useState } from 'react'
import Modal from './modal'
import ReflectButton from '../reflectButton'
import { TextField, ResponseMessage } from '../Forms'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'

const TextFieldContainer = styled.div`
    padding-left: 15px;
    padding-right: 15px;
`

export const ForgotPassModal = ({ onSubmit, response, ...props }) => {
    const { onAction } = props
    const { register, handleSubmit, errors } = useForm()

    return (
        <Modal {...props}>
            <>
                <ResponseMessage error={response.error}>
                    {response.message}
                </ResponseMessage>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextFieldContainer>
                        <TextField
                            inputRef={register({
                                required: true,
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                },
                            })}
                            error={errors.email && true}
                            label="Email"
                            name="email"
                            margin="normal"
                            type="email"
                        />
                    </TextFieldContainer>
                    <ReflectButton text="RESTAURAR" />
                    <ReflectButton
                        text="CANCELAR"
                        clicked={() => onAction('cancel')}
                    />
                </form>
            </>
        </Modal>
    )
}
