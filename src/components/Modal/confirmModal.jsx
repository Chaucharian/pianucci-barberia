import React from 'react'
import Modal from './modal'
import ReflectButton from '../reflectButton'

export const ConfirmModal = ({ ...props }) => {
    const { onlyConfirm, onAction } = props
    return (
        <Modal {...props}>
            <>
                {onlyConfirm ? (
                    <ReflectButton
                        text="ACEPTAR"
                        clicked={() => onAction('cancel')}
                    />
                ) : (
                    <>
                        <ReflectButton
                            text="CONFIRMAR"
                            clicked={() => onAction('confirm')}
                        />
                        <ReflectButton
                            text="CANCELAR"
                            clicked={() => onAction('cancel')}
                        />
                    </>
                )}
            </>
        </Modal>
    )
}
