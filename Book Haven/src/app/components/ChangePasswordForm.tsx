"use client";
import React, { useState } from 'react'
import { changePassword } from '../api/auth/reset-password/route';

interface ChangePasswordFormProps {
    resetPasswordToken: string;
}

const ChangePasswordForm = ({ resetPasswordToken }: ChangePasswordFormProps) => {

    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [message, setMessage] = useState<string>("");

    const handleSubmit = async () => {
        if (password == "" || confirmPassword == "") {
            setMessage ('Por favor rellene los campos vacios')
            return
        }
        if (password.length < 5) {
            setMessage("La contraseña debe tener al menos 5 caracteres");
            return;
        }
        if (password !== confirmPassword) {
            setMessage("Las contrasenas no coinciden")
            return
        }
        
        const message = await changePassword(resetPasswordToken, password);

        setMessage(message);
    }

    return (
        <div className="flex flex-col justify-center items-center h-screen">
                <h1 className=" text-slate-700 font-bold text-4xl mb-4">Reestablecer</h1>
                <label htmlFor="password" className="text-slate-500 mb-2 block text-sm w-1/4">
                    Cambio de contraseña:
                </label>
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-1/4"
                    type="password"
                    placeholder="Nueva contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <input className="p-3 rounded block mb-2 bg-slate-900 text-slate-300 w-1/4"
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <button onClick={handleSubmit} className="w-1/4 bg-blue-500 text-white p-3 rounded-lg mt-2">
                    Cambiar contraseña
                </button>
                <p className='p-4'>{message}</p>
        </div>
    )
}

export default ChangePasswordForm