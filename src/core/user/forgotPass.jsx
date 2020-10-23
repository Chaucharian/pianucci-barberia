import React, { useState } from "react";
import { ForgotPassModal } from '/components/Modal';
import styled from 'styled-components';
import { useQuery } from 'react-query'
import * as api from '/services/api';

const Link = styled.a`
    cursor: pointer;
`;

const ForgotPass = () => {
    const [isModalOpen, showModal] = useState(false);
    const [email, setEmail] = useState(null);
    const { data, isLoading, isSuccess } = useQuery(['user/forgot', email], (key, email) => api.checkEmailExists(email), { enabled: email, retry: false, refetchOnWindowFocus: false });

    const modalHandler = (action) => {
        if (action === "confirm") {
            showModal(false);
        } else {
            showModal(false);
        }
    };

    const submit = ({ email }) => setEmail(email);

    return (
        <>
            <Link onClick={() => showModal(true)}>¿Olvidaste tu contraseña?</Link>
            <ForgotPassModal
                open={isModalOpen}
                title={"Ingresa tu email"}
                description={"te enviaremos un email con una nueva contraseña"}
                onAction={modalHandler}
                onSubmit={submit}
            />
        </>
    );
};

export default ForgotPass;
