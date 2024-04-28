import * as React from 'react';

interface ResetPasswordEmailTemplateProps {
    email: string;
    resetPasswordToken: string;
}

export const ResetPasswordEmailTemplate: React.FC<Readonly<ResetPasswordEmailTemplateProps>> = ({ email, resetPasswordToken }) => (
    <div>
        <h2>Solicitud de reestablecimiento de contraseña para <b>{email}</b></h2>
        <p>
            Por seguridad este correo solo estara disponible un limite de tiempo. Si realmente deseas restablecer tu contraseña, 
            haz clic <a href={`http://localhost:3000/auth/reset-password?token=${resetPasswordToken}`}> Aqui
            </a>
        </p>
        {/* <a href={`http://localhost:3000/auth/reset-password?token=${resetPasswordToken}`}>
            Aqui
        </a> */}
    </div>
);
