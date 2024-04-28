import * as React from 'react';

interface VerifyEmailEmailTemplateProps {
    email: string;
    emailVerificationToken: string;
}

export const VerifyEmailEmailTemplate: React.FC<Readonly<VerifyEmailEmailTemplateProps>> = ({ email, emailVerificationToken }) => (
    <div>
        <h1>Verificar correo para <b>{email}</b></h1>
        <p>
            Para verificar el correo haga clic en el siguiente enlace
        </p>
        <a href={`http://localhost:3000/auth/verify-email?token=${emailVerificationToken}`}>
            Verificar correo
        </a>
    </div>
);
