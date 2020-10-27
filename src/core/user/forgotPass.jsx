import React, { useState } from 'react'
import { ForgotPassModal } from 'components/Modal'
import styled from 'styled-components'
import { useQuery } from 'react-query'
import * as api from '/services/api'
import { useSelector, selectAuth, selectUser } from 'context'

const Link = styled.a`
    cursor: pointer;
`

const ForgotPass = () => {
    const [isModalOpen, showModal] = useState(false)
    const [email, setEmail] = useState(null)
    const auth = useSelector(selectAuth)
    const { data, error, isError } = useQuery(
        ['user/forgot', email],
        (key, email) =>
            api.checkEmailExists(email).then(async ({ success, message }) => {
                if (!success) {
                    throw { message }
                }
                await auth.resetPassword(email)
                return { message }
            }),
        { enabled: email, retry: false, refetchOnWindowFocus: false }
    )

    const modalHandler = (action) => {
        if (action === 'confirm') {
            showModal(false)
        } else {
            showModal(false)
        }
    }

    const submit = ({ email }) => setEmail(email)

    return (
        <>
            <Link onClick={() => showModal(true)}>
                ¿Olvidaste tu contraseña?
            </Link>
            <ForgotPassModal
                open={isModalOpen}
                title={'Ingresa tu email'}
                description={'te enviaremos un email con una nueva contraseña'}
                response={{
                    message: data?.message ?? error?.message,
                    error: isError,
                }}
                onAction={modalHandler}
                onSubmit={submit}
            />
        </>
    )
}

export default ForgotPass
